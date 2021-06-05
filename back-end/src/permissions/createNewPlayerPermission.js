import { addPermission } from "./addPermission";
import { PLAYER } from "./permissionTypes";

export const createNewPlayerPermission = async ({ userId, groupId }) => {
    if (!userId || !groupId) {
        throw new Error("please-provide-all-fields");
    }
    console.log("PLAYER permission created");
    await addPermission({ userId, groupId, permissionType: PLAYER });
};
