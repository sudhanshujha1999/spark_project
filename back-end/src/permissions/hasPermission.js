import { Permissions } from "../models";

export const hasPermission = async ({ userId, groupId, permissionType }) => {
    const permissionExists = await Permissions.findOne({
        userId,
        groupId,
        permission_type: permissionType,
    });
    return permissionExists;
};
