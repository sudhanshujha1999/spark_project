import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "../users";
import { hasPermission } from './hasPermission';
import { removePermission } from './removePermission';

export const removePermissionsRoute = {
    path: '/permissions',
    method: 'delete',
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

        // 2. Are they allowed to remove permissions for this group? i.e. are they an ADMIN?
        const canRemovePermissions = await hasPermission({
            userId: requesterId, 
            groupId,
            permissionType: 'ADMIN',
        });

        if (!canRemovePermissions) return res.status(401).json({ message: 'User must be an admin to change permissions for group' });

        // 3. If everything else checks out, remove the permissions
        try {
            await Promise.all(
                permissionTypes.map(permissionType =>
                    removePermission({
                        userId: targetUserId,
                        groupId,
                        permissionType,
                    })
                )
            )
            res.sendStatus(200);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}