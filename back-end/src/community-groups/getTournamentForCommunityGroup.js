import { Tournament } from "../models";

export const getTournamentForCommunityGroup = async ({ groupId }) => {
    if (!groupId) {
        throw new Error("no-groupId");
    }
    const tournaments = await Tournament.find({ community_group: groupId });
    return tournaments;
};
