// MONGODB MINGRATION
import { Users, ORGANIZATION, Groups } from "../models";
import { v4 as uuidv4 } from "uuid";

export const createOrganization = async ({
    name,
    creatorId,
    image_url,
    location,
    organization_level,
}) => {
    const userDetails = await Users.findById(creatorId);
    const findIfGroupExist = await Groups.findOne({ name: name, group_type: ORGANIZATION });

    if (!userDetails) {
        throw new Error("no-user-found");
    }

    if (findIfGroupExist) {
        throw new Error("organization-already-exist");
    }

    const organization_code = uuidv4().split("-")[0].toUpperCase();
    const admin = [
        {
            id: creatorId,
            name: userDetails.full_name,
            email: userDetails.email,
            profile_img: userDetails.profile_img,
            admin_type: "ADMIN",
        },
    ];
    const newOrganization = new Groups({
        name: name,
        image_url,
        group_type: ORGANIZATION,
        created_by: creatorId,
        location,
        organization_level: organization_level,
        organization_code: organization_code,
        admins: admin,
    });
    const parent_groups = [newOrganization._id];
    await newOrganization.save();
    await newOrganization.updateOne({ $set: { parent_groups: parent_groups } });
    return newOrganization._id;
};
