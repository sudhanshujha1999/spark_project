import { Groups, Permissions, Users } from "../models";
import { PLAYER } from "./permissionTypes";

export const makePlayer = async ({ userId, groupId }) => {
    // get all group ids
    const groupIds = await Groups.find({ parent_groups: groupId }).select("_id").lean();
    // delete all permissions which have don't have player as permission in that group
    await Permissions.deleteMany({
        groupId: groupIds.map(({ _id }) => _id),
        userId: userId,
        permission_type: {
            $ne: PLAYER,
        },
    });

    // update in teams and rosters as captian
    const user = await Users.findById(userId);
    // find all the groups which have the team id as parent and update them as follow
    await Groups.updateMany(
        { parent_groups: groupId, "players.id": user._id },
        {
            // add player role as player
            $set: {
                "players.$.player_role": PLAYER,
            },
            // remove player in admin too
            $pull: {
                admins: { id: user._id },
            },
        }
    );
    console.log("stripped off all the permissions, only player remains");
};
