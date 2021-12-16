import { CommunityGroups } from "../models";
import { getUserById } from "../users";
import { checkBasicGroupPermission } from "./checkBasicGroupPermission";

export const addBulletin = async ({ groupId, userId, user = {}, bulletinValue = "" }) => {
    const group = await CommunityGroups.findById(groupId);
    if (!group) {
        throw new Error("no-group-found");
    }
    if (!bulletinValue) {
        throw new Error("no-value-provided");
    }
    let currentUser = user;
    if (!currentUser._id) {
        console.log("get-user");
        currentUser = await getUserById(userId);
    }
    const admins = group.admins;
    const isGroupAdmin = admins.includes(userId);
    // check if a group admin
    if (isGroupAdmin) {
        console.log("user-is-a-group-admin");
    } else {
        // if not a group admin, check if is a admin of member organization
        const hasPermission = await checkBasicGroupPermission({ groupId, userId });
        if (!hasPermission) {
            console.log("not-an-admin-of-group");
            throw new Error("permission-required");
        }
        console.log("user-is-organization-admin");
    }
    const newBulletinObject = {
        value: bulletinValue,
        created_by: currentUser._id,
        creator_name: currentUser.name,
        created_at: Date.now(),
    };
    const currentBulletins = group.bulletins || [];
    if (currentBulletins.length) {
        if (
            currentBulletins.some(
                (bulletinItem) =>
                    bulletinItem.value === bulletinValue &&
                    bulletinItem.created_by === currentUser._id
            )
        ) {
            throw new Error("already-created");
        }
    }

    // add to group activity

    await group.updateOne({
        $addToSet: { bulletins: newBulletinObject },
    });
    console.log("bulletin-added");
    return true;
};
