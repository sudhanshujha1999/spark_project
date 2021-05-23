// Mongo Db miongration
import { Groups, ROSTER } from "../models";

export const createRoster = async ({ name = "", teamId, organizationId, coach }) => {
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
    const parent_groups = [organizationId, teamId, newRoster._id];
    await newRoster.save();
    await newRoster.updateOne({ $set: { parent_groups: parent_groups } });
};
