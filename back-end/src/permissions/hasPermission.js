import { Permissions } from "../models";
/*
    Permissions in the database look like this:

    {
        userId: '123123123',
        groupId: '163456345734567',
        permissionType: 'CAN_EDIT_EVENTS', // These are in permissionTypes.js
    }
*/
export const hasPermission = async ({ userId, groupId, permissionType }) => {
    const permissionExists = await Permissions.findOne({
        userId,
        groupId,
        permission_type: permissionType,
    });
    return permissionExists;
};
