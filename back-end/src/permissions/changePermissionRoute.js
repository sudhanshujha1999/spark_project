import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "../users";
import { VALID_PERMISSIONS } from "../models/validPermission";
import { hasPermission } from "./hasPermission";
import { createCaptian } from "./createCaptain";
import { makePlayer } from "./makePlayer";
import { ADMIN, CAPTIAN, PLAYER } from "./permissionTypes";

export const changePermissionRoute = {
    path: "/permissions/captian",
    method: "post",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        try {
            // 1. Who's sending this request? (We need to translate their authId to an actual userId)
            const requesterAuthId = req.user.uid;
            const requesterUser = await getUserByAuthId(requesterAuthId);
            const requesterId = requesterUser._id;

            const { userId: targetUserId, groupId, permission } = req.body;
            // 2. Are they allowed to add permissions for this group? i.e. are they an ADMIN?
            const canAddPermission = await hasPermission({
                userId: requesterId,
                groupId,
                permissionType: ADMIN,
            });
            if (!canAddPermission) return res.sendStatus(401);

            // no valid pemission
            if (!VALID_PERMISSIONS.includes(permission)) {
                return res.send(404).json({
                    success: true,
                    message: "Permission not found",
                });
            }

            switch (permission) {
                case PLAYER: {
                    await makePlayer({ userId: targetUserId, groupId });
                    break;
                }
                case CAPTIAN: {
                    await createCaptian({ userId: targetUserId, groupId });
                    break;
                }
                default: {
                    console.log("no-permission-change");
                    break;
                }
            }

            return res.status(200).json({
                success: true,
            });
        } catch (e) {
            console.log(e.message);
            return res.status(500).json(e.message);
        }
    },
};
