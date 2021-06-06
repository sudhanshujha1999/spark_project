import { getRostersForTeam } from "../rosters";
import { Groups, TEAM } from "../models";
import { getAllInvitationsForTeam } from "../invitations";

export const getTeamRoute = {
    path: "/teams/:teamId",
    method: "get",
    handler: async (req, res) => {
        const { teamId } = req.params;
        try {
            const team = await Groups.findOne({
                parent_groups: teamId,
                group_type: TEAM,
            }).select("-parent_groups");
            // Check if team is there
            if (!team) {
                return res.status(404).json({
                    success: false,
                    team: [],
                    message: "No team found",
                });
            }
            // Get all invitations in a team
            const invitations = await getAllInvitationsForTeam(teamId);
            // Get roster for a team
            const roster = await getRostersForTeam(teamId);
            // make a object that has all the roster in a team object
            const teamWithRosters = {
                ...team.toObject(),
                rosters: roster,
                invitations: invitations,
            };
            return res.status(200).json({
                team: teamWithRosters,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({
                team: [],
                message: error.message,
                success: false,
            });
        }
    },
};
