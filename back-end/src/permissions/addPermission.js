import { Permissions } from "../models";

export const addPermission = ({ userId, groupId, permissionType }) => {
    return new Permissions({
        userId: userId,
        groupId: groupId,
        permission_type: permissionType,
    }).save();
};
