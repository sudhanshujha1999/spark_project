import { Groups } from "../models";
export const addPlayerIdToGroup = async ({
    groupId,
    playerId,
    email,
    gamerName = "",
    bio = "",
    profile_img = "",
    name = "",
}) => {
    if (!playerId) {
        throw new Error(`no-player-with-this-id-${playerId}`);
    }
    const playerToAdd = {
        id: playerId,
        name: name,
        email: email,
        gamerName: gamerName,
        bio: bio,
        profile_img: profile_img,
    };
    await Groups.findByIdAndUpdate(groupId, { $push: { players: playerToAdd } }, { new: true });
};
