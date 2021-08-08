import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "../users";
import { declineRequest } from "./changeRequestSatus";

export const declineInvitationRoute = {
    path: "/scrimmage/:requestId/decline/",
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
            console.log("invitation-declined");
            const status = await declineRequest(requestId);
            return res.status(200).json({
                success: true,
                declined: status,
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
