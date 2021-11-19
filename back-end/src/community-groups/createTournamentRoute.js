import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "../users";
import { createTournament } from "./createTournament";
export const createTournamentRoute = {
    method: "post",
    path: "/tournament",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        const authUser = req.user;
        try {
            const { tournamentName, gameName, img, groupId } = req.body;
            const user = await getUserByAuthId(authUser.user_id);
            const tournamentId = await createTournament({
                tournamentName,
                gameName,
                img,
                groupId,
                userId: user._id,
            });
            return res.status(200).json({
                success: true,
                tournamentId: tournamentId,
            });
        } catch (error) {
            console.log(error.message);
            if (error.message === "no-org-found") {
                return res.status(403).json({
                    success: false,
                    message: `You are not part of that group`,
                });
            }
            return res.status(403).json({
                success: false,
                message: `Server error`,
            });
        }
    },
};
