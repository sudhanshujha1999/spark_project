import { Groups } from "../models";

export const getGroupById = async (groupId) => {
    const group = await Groups.findById(groupId);
    if (group) {
        return group;
    } else {
        return null;
    }
};
