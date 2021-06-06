import { Permissions } from "../models";

export const removeAllPermissionsOfGroup = async ({ groupId }) => {
    await Permissions.deleteMany({ groupId: groupId });
};
