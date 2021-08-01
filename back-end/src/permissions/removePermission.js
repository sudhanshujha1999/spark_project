import { Permissions } from "../models";

export const removePermissions = async ({ userId, groupId, permissionType }) => {
    await Permissions.findOneAndDelete({ userId, groupId, permission_type: permissionType });
};
