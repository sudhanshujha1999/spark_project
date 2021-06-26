import { getUserByAuthId } from "../users";
import { deleteLeague } from "./deleteLeague";

export const deleteLeagueRoute = {
    path: "/:leagueId/league",
    method: "delete",
    handler: async (req, res) => {
        const authUser = req.user;

        const { leagueId } = req.params;
        try {
            const user = await getUserByAuthId(authUser.user_id);
            if (!user) {
                return res.status(404).json({
                    message: "no-user-found",
                });
            }
            // deleteLeague
            // const leagueId = await deleteLeague(leagueId, user._id);
            await deleteLeague(leagueId, user.id);
            return res.status(200).json({
                success: true,
                leagueId,
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
