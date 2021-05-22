import { Groups, ROSTER } from "../models";

export const createDefaultRoster = async ({ organizationId, teamId, coach }) => {
    try {
        if (!coach._id) {
            throw new Error("invalid-coach");
        }
        // add admin
        const admin = [
            {
                id: coach._id,
                name: coach.full_name,
                email: coach.email,
                profile_img: coach.profile_img,
                admin_type: "ADMIN",
            },
        ];
        // create default-roster group
        const defaultRoster = new Groups({
            name: "DEFAULT_ROSTER",
            group_type: ROSTER,
            admins: admin,
            created_by: coach._id,
        });
        // create parent group
        const parent_groups = [organizationId, teamId, defaultRoster._id];
        await defaultRoster.save();
        await defaultRoster.updateOne({ $set: { parent_groups: parent_groups } });
        console.log("DefaultRosterCreated");
    } catch (error) {
        console.log(error.message);
        console.log("Error creating default roster");
    }
};
