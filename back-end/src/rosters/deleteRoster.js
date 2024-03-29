import { Groups } from "../models";
import { removeAllPermissionsOfGroup } from "../permissions";

export const deleteRoster = async (rosterId, userId) => {
    const roster = await Groups.findOne({ _id: rosterId, created_by: userId });
    if (!roster) {
        throw new Error("not-authorized-to-delete");
    }
    await roster.deleteOne();
    await removeAllPermissionsOfGroup({ groupId: roster._id });
    return roster.created_by === userId;
};
