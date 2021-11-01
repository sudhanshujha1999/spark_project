import { CommunityGroups } from "../models";
import { getUserById } from "../users";

export const addBulletin = async ({ groupId, userId, user = {}, bulletinValue = "" }) => {
    const group = await CommunityGroups.findById(groupId);
    if (!group) {
        throw new Error("no-group-found");
    }
    if (!bulletinValue) {
        throw new Error("no-value-provided");
    }
    const admins = group.admins;
    let currentUser = user;
    if (!currentUser._id) {
        console.log("get-user");
        currentUser = await getUserById(userId);
    }
    // later we can have to check it on basis of admins of the member_organizations
    // need to discuss about this check
    // if (admins.includes(userId)) {
    //     console.log("user-is-a-group-admin");
    // } else {
    //     console.log("not-an-admin-of-group");
    // }
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

    // await group.updateOne({
    //     $addToSet: { bulletins: newBulletinObject },
    // });
    return true;
};
