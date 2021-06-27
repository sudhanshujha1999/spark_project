import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "../users";
import { getWarRoomSession } from "./getWarRoomSession";

export const getSessionRoute = {
    path: "/:sessionId/war-room",
    method: "get",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        const authUser = req.user;
        const { sessionId } = req.params;
        try {
            console.log(sessionId);
            // user creating the war room session
            const user = await getUserByAuthId(authUser.user_id);
            if (!user) {
                return res.status(404).json({
                    message: "no-user-found",
                });
            }
            // get the current session which is called
            const session = await getWarRoomSession({ sessionId, userId: user._id });
            if (!session) {
                return res.status(404).json({
                    message: "no-session-found",
                });
            }
            return res.status(200).json({
                success: true,
                session,
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
