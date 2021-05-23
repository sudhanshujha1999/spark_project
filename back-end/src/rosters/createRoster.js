// Mongo Db miongration
import { Groups, ROSTER } from "../models";

export const createRoster = async ({ name = "", teamId, organizationId = null, coach }) => {
    if (name === "") {
        throw new Error("requied-fields-not-filled");
    }
    // create an admin of user
    const admin = [
        {
            id: coach._id,
            name: coach.full_name,
            email: coach.email,
            profile_img: coach.profile_img,
            admin_type: "ADMIN",
        },
    ];
    // create default roster
    const newRoster = new Groups({
        name: name,
        group_type: ROSTER,
        admins: admin,
        created_by: coach._id,
    });
    // add parent groups

    let parent_groups = [];
    // check if organizationId is provided or not
    if (!organizationId) {
        const team = await Groups.findById(teamId);
        if (team) {
            parent_groups = [...team.parent_groups, newRoster._id];
        } else {
            throw new Error("no-team-found");
        }
    } else {
        parent_groups = [organizationId, teamId, newRoster._id];
    }
    await newRoster.save();
    await newRoster.updateOne({ $set: { parent_groups: parent_groups } });
};
