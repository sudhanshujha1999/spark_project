import { Permissions } from "../models";

export const getAllPermissions = async (userId) => {
    const allPermissions = await Permissions.find({
        userId: userId,
    });
    return allPermissions;
};
