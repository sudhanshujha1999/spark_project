import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "../users";
import { acceptRequest } from "./changeRequestSatus";

export const acceptInvitationRoute = {
    path: "/scrimmage/:requestId/accept/",
    method: "post",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        const authUser = req.user;
        try {
            const user = await getUserByAuthId(authUser.user_id);
            // ----
            // Check permission
            // ----
            const { requestId } = req.params;
            const status = await acceptRequest(requestId);
            console.log("invitation-accepted");
            return res.status(200).json({
                success: true,
                accepted: status,
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
