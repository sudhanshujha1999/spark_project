import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "../users";
import { hasPermission, ADMIN } from "../permissions/";
import { joinGroup } from "./joinGroup";

export const joinGroupRoute = {
    method: "post",
    path: "/community-group/:organizationId/join/",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        const { groupCode } = req.body;
        const { organizationId } = req.params;
        const authUser = req.user;
        try {
            const user = await getUserByAuthId(authUser.user_id);
            const permission = await hasPermission({
                userId: user._id,
                groupId: organizationId,
                permissionType: ADMIN,
            });
            if (!permission) {
                return res.status(403).json({
                    success: false,
                    message: "You do not have required permission to join the group",
                });
            }
            console.log("Joining");
            const groupId = await joinGroup({ organizationId, groupCode });
            return res.status(200).json({
                success: true,
                groupId: groupId,
            });
        } catch (error) {
            console.log(error.message);
            if (error.message === "no-org-found") {
                return res.status(404).json({
                    success: false,
                    message: `Your organization not found`,
                });
            }
            if (error.message === "no-group-found") {
                return res.status(404).json({
                    success: false,
                    message: `No groupexist`,
                });
            }
            return res.status(403).json({
                success: false,
                message: `Server error`,
            });
        }
    },
};
