import { updateTournament } from "./updateTournament";
import { getUserByAuthId } from "../users/getUserByAuthId";
import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";

export const updateTournamentRoute = {
    method: "put",
    path: "/:tournamentId/tournament/update/",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        const { tournamentId } = req.params;
        const authUser = req.user;
        try {
            const user = await getUserByAuthId(authUser.user_id);
            const tournament = await updateTournament({
                tournamentId,
                params: req.body,
                userId: user._id,
            });
            return res.status(200).json({
                success: true,
                updated: tournament,
            });
        } catch (error) {
            console.log(error.message);
            if (error.message === "no-tournamentId") {
                return res.status(404).json({
                    success: false,
                    message: `No Tournament ID not found`,
                });
            }
            if (error.message === "no-tournament-for-user-top-update") {
                return res.status(403).json({
                    success: false,
                    message: `No tournament exist for User`,
                });
            }
            return res.status(500).json({
                success: false,
                message: `Server error`,
            });
        }
    },
};
