import { Groups, TEAM } from "../models";
export const createTeam = async ({ name = "", game = "", organizationId, coach = {}, url }) => {
    if (name === "" || game === "") {
        throw new Error("requied-fields-not-filled");
    }
    if (!coach._id) {
        throw new Error("invalid-coach");
    }
    // create the user the admin
    const admin = [
        {
            id: coach._id,
            name: coach.full_name,
            email: coach.email,
            profile_img: coach.profile_img,
            admin_type: "ADMIN",
        },
    ];

    // create the new team
    const newTeam = new Groups({
        name: name,
        game: game,
        image_url: url,
        group_type: TEAM,
        created_by: coach._id,
        admins: admin,
    });
    // add id's in parent group
    const parent_groups = [organizationId, newTeam._id];
    await newTeam.save();
    await newTeam.updateOne({ $set: { parent_groups: parent_groups } });
    return newTeam._id;
};
