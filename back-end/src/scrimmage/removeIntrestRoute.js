import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "../users";

import { removeRequest } from "./removeRequest";

export const removeIntrestRoute = {
    path: "/scrimmage/:scrimmageId/:organizationId/interested/",
    method: "delete",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        const authUser = req.user;
        try {
            const user = await getUserByAuthId(authUser.user_id);

            // ----
            // Check permission
            // ----
            const { scrimmageId, organizationId } = req.params;
            await removeRequest({
                scrimmageId,
                organizationId,
            });
            return res.status(200).json({
                success: true,
                scrimmage_request_removed: true,
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
