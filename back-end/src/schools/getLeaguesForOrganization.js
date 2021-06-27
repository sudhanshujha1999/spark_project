import { League } from "../models";
export const getLeaguesForOrganizations = async (organizationId) => {
    const leagues = await League.find({
        groupId: organizationId,
    }).lean();
    return leagues;
};
