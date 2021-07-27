import { getGroupById } from "../groups";
import { Scrimmage } from "../models";

export const createScrimmage = async ({
    game,
    date,
    organizationId,
    teams,
    skillLevel,
    createdBy,
}) => {
    // get the organization
    const organizationInfo = await getGroupById(organizationId);
    if (!organizationInfo) {
        throw new Error("no-organization-found");
    }
    const coaches = organizationInfo.admins.map((admin) => ({
        id: admin.id,
        name: admin.name,
    }));

    const newScrimmageObject = {
        organizationId: organizationInfo._id,
        organization_name: organizationInfo.name,
        organization_logo: organizationInfo.image_url,
        organization_location: organizationInfo.location,
        game,
        teams,
        date: new Date(date),
        skill_level: skillLevel,
        created_by: createdBy,
        coaches,
    };
    const newScrimmage = new Scrimmage(newScrimmageObject);
    await newScrimmage.save();
    return newScrimmage._id;
};
