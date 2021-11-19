import { CommunityGroups } from "../models";

export const getGroupById = async (id) => {
    return await CommunityGroups.findById(id).lean();
};
