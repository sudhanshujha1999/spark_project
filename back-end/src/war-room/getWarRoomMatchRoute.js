import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "../users";
import { getWarRoomMatch } from "./getWarRoomMatch";

export const getWarRoomMatchRoute = {
    path: "/:matchId/war-room",
    method: "get",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        const authUser = req.user;
        const { matchId } = req.params;
        try {
            // user creating the war room session
            const user = await getUserByAuthId(authUser.user_id);
            if (!user) {
                return res.status(404).json({
                    message: "no-user-found",
                });
            }
            // get the current session which is called
            const match = await getWarRoomMatch({ matchId, userId: user._id });
            if (!match) {
                return res.status(404).json({
                    message: "no-session-found",
                });
            }
            return res.status(200).json({
                success: true,
                match,
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
