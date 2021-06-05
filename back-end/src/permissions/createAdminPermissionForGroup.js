import { addPermission } from "./addPermission";
import { ADMIN } from "./permissionTypes";
export const createAdminPermissionForGroup = async ({ userId, groupId }) => {
    if (!userId || !groupId) {
        throw new Error("please-provide-all-fields");
    }
    console.log("ADMIN permission created");
    await addPermission({ userId, groupId, permissionType: ADMIN });
};
