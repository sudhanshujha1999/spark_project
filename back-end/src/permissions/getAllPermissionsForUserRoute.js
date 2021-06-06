import { getAllPermissions } from "./getAllPermissions";
import { VALID_PERMISSIONS } from "../models";

export const getAllPermissionsForUserRoute = {
    method: "get",
    path: "/:userId/permissions",
    handler: async (req, res) => {
        const { userId } = req.params;
        try {
            const allPermissions = await getAllPermissions(userId);
            let basicAllPermissionObject = {};
            VALID_PERMISSIONS.forEach((name) => {
                basicAllPermissionObject[`${name}`] = false;
            });
            let groupedByGroupId = {};
            allPermissions.forEach((permission) => {
                const permissionType = permission.permission_type;
                // check if the object for that group is there or not
                if (groupedByGroupId[`${permission.groupId}`]) {
                    // then got to that group.permissiontype and ssign boolean;
                    groupedByGroupId[`${permission.groupId}`][`${permissionType}`] = true;
                } else {
                    // assign the default value ie. all false in beggening and then
                    // turn the permission type to true
                    groupedByGroupId[`${permission.groupId}`] = { ...basicAllPermissionObject };
                    // then got to that group.permissiontype and ssign boolean;
                    groupedByGroupId[`${permission.groupId}`][`${permissionType}`] = true;
                }
            });
            return res.status(200).json({ permissions: groupedByGroupId });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({
                success: false,
                error: error.message,
                message: "server-error",
            });
        }
    },
};
