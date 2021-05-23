import { Groups, ORGANIZATION, TEAM, ROSTER } from "../models";
import { getUserByAuthId } from "../users";

// Mongo DB Migration

export const getAllGroupsForUser = {
    path: "/users/:userId/teams",
    method: "get",
    handler: async (req, res) => {
        try {
            const { userId: authId } = req.params;
            const user = await getUserByAuthId(authId);
            //We can get all the groups or we can get all orgs then all teams for a user
            const user_organization = await Groups.find({
                _id: { $in: user.organizations },
                group_type: ORGANIZATION,
            });
            // Get the teams where the user is either player or admin ie. coach or captain
            const user_teams = await Groups.find({
                parent_groups: { $in: user.organizations },
                group_type: TEAM,
                $or: [{ "admins.id": user._id }, { "players.id": user._id }],
            });
            // IN UPDATE USE updateMany
            // Group it for the result
            let groupedOrganization = [];
            // if more than 1 orgs
            if (user_organization.length > 1) {
                // Need to write grouping for more organization
            } else if (user_organization.length === 1) {
                let organization = { ...user_organization[0].toObject() };
                organization.teams = user_teams;
                groupedOrganization.push(organization);
            } else {
                console.log("NO_ORG");
            }
            return res.status(200).json({ success: true, organizations: groupedOrganization });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
};
