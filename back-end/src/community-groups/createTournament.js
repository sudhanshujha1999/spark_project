import { getGroupById } from "./getGroupById";
import { Tournament } from "../models";

export const createTournament = async ({ tournamentName, gameName, img, groupId, userId }) => {
    if (!tournamentName || !gameName) {
        throw new Error("no-required-fields");
    }
    const communityGroup = await getGroupById(groupId);
    if (!communityGroup) {
        throw new Error("no-group-found");
    }
    const ifExist = await Tournament.findOne({ name: tournamentName, community_group: groupId });
    if (ifExist) {
        throw new Error("already-exist");
    }
    const newTournament = await new Tournament({
        name: tournamentName,
        game: gameName,
        created_by_user: userId,
        community_group: groupId,
        image_url: img,
    }).save();
    console.log("created-tournament");
    return newTournament._id;
};
