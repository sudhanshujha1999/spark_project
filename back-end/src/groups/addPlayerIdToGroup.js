import { Groups } from "../models";
import { createNewPlayerPermission } from "../permissions";

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
    await createNewPlayerPermission({ userId: playerId, groupId: groupId });
    await Groups.findByIdAndUpdate(groupId, { $push: { players: playerToAdd } }, { new: true });
};
