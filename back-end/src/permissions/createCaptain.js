import { Groups, Permissions, Users } from "../models";
import { CAPTIAN } from "./permissionTypes";

export const createCaptian = async ({ userId, groupId }) => {
    // check if the group already has a captian
    const hasCaptian = await Permissions.findOne({
        groupId,
        permission_type: CAPTIAN,
    });
    if (hasCaptian) {
        throw new Error("Team already has a captian");
    }
    // update in teams and rosters as captian
    const user = await Users.findById(userId);
    const adminObject = {
        id: user._id,
        name: user.full_name,
        email: user.email,
        profile_img: user.profile_img,
        admin_type: CAPTIAN,
    };
    // find all the groups which have the team id as parent and update them as follow
    await Groups.updateMany(
        { parent_groups: groupId, "players.id": user._id },
        {
            // add player role as player
            $set: {
                "players.$.player_role": CAPTIAN,
            },
            // add player in admin too
            $push: {
                admins: adminObject,
            },
        }
    );
    // make captian permissions
    const groupIds = await Groups.find({ parent_groups: groupId }).select("_id").lean();
    const allPermissionObject = groupIds.map(({ _id }) => ({
        userId: user._id,
        groupId: _id,
        permission_type: CAPTIAN,
    }));
    await Permissions.insertMany(allPermissionObject);
    console.log("updated_permission_to_captain");
};
