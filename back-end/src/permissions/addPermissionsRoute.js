import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "../users";
import { addPermission } from "./addPermission";
import { hasPermission } from "./hasPermission";
import { ADMIN } from "./permissionTypes";

export const addPermissionsRoute = {
    path: "/permissions",
    method: "post",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        // 1. Who's sending this request? (We need to translate their authId to an actual userId)
        const requesterAuthId = req.user.uid;
        const requesterUser = await getUserByAuthId(requesterAuthId);
        const requesterId = requesterUser.id;

        const {
            userId: targetUserId,
            groupId,
            permissionTypes, // This needs to be an array
        } = req.body;

        // 2. Are they allowed to add permissions for this group? i.e. are they an ADMIN?
        const canAddPermission = await hasPermission({
            userId: requesterId,
            groupId,
            permissionType: ADMIN,
        });

        if (!canAddPermission) return res.sendStatus(401);

        // 3. If everything else checks out, add the permissions
        try {
            await Promise.all(
                permissionTypes.map((permissionType) =>
                    addPermission({
                        userId: targetUserId,
                        groupId,
                        permissionType,
                    })
                )
            );
            res.sendStatus(200);
        } catch (e) {
            res.status(500).json(e.message);
        }
    },
};
