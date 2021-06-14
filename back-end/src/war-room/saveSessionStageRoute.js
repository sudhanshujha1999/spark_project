import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "../users";
import { saveStagesOfWarRoom } from "./saveStagesOfWarRoom";

export const saveSessionStageRoute = {
    path: "/:sessionId/save/session",
    method: "post",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        const authUser = req.user;
        const { sessionId } = req.params;
        const { stages } = req.body;
        try {
            // user creating the war room session
            const user = await getUserByAuthId(authUser.user_id);
            if (!user) {
                return res.status(404).json({
                    message: "no-user-found",
                });
            }
            // check permission here
            // ---------------------
            // upate stages in db
            await saveStagesOfWarRoom({ sessionId, newStages: stages });
            return res.status(200).json({
                success: true,
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
