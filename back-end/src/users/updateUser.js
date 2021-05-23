import { Users, Groups } from "../models";

export const updateUser = async (userId, params) => {
    let query = {};
    for (var key in params) {
        //could also be req.query and req.params
        params[key] !== "" ? (query[key] = params[key]) : null;
    }
    const updated = await Users.findByIdAndUpdate(userId, { $set: query }, { new: true });
    // make a query to update in all groups
    // for all where he is admin
    await Groups.updateMany(
        { "admins.id": updated._id },
        {
            $set: {
                "admins.$.name": updated.full_name,
                "admins.$.profile_img": updated.profile_img,
            },
        },
        {
            new: true,
        }
    );
    // for all where he is player
    await Groups.updateMany(
        { "players.id": updated._id },
        {
            $set: {
                "players.$.name": updated.full_name,
                "players.$.gamerName": updated.gamer_name,
                "players.$.profile_img": updated.profile_img,
                "players.$.bio": updated.bio,
            },
        },
        {
            new: true,
        }
    );

    return updated;
};
