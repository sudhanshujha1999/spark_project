import { getUserByAuthId } from "../users";
import { addLeague } from "./addLeague";

export const addLeagueToOrganizationRoute = {
    path: "/:groupId/league",
    method: "post",
    handler: async (req, res) => {
        const authUser = req.user;
        const { groupId } = req.params;
        const { team, leagueName, game } = req.body;
        try {
            // user creating the league
            const user = await getUserByAuthId(authUser.user_id);
            if (!user) {
                return res.status(404).json({
                    message: "no-user-found",
                });
            }
            // check permission here
            // ---------------------
            // add league
            const legueId = await addLeague({
                team: team,
                game: game,
                league: leagueName,
                userId: user._id,
                groupId: groupId,
            });
            return res.status(200).json({
                success: true,
                legueId: legueId,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
};
