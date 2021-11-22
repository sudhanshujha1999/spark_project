import { getUserByAuthId } from "../users";
import { getTournamentById } from "./getTournamentById";

export const getTournamentDetailsRoute = {
    method: "get",
    path: "/:tournamentId/details/tournament",
    handler: async (req, res) => {
        const authUser = req.user;
        const user = await getUserByAuthId(authUser.user_id);
        try {
            const { tournamentId } = req.params;
            const tournament = await getTournamentById({ tournamentId, userId: user._id });
            return res.status(200).json({
                success: true,
                tournament: tournament,
            });
        } catch (error) {
            console.log(error.message);
            if (error.message === "no-groupId") {
                return res.status(403).json({
                    success: false,
                    message: `You are not part of that group`,
                });
            }
            return res.status(500).json({
                success: false,
                message: `Server error`,
            });
        }
    },
};
