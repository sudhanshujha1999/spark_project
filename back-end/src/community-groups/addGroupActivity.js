import { CommunityGroupsActivity } from "../models";

export const addGroupActivity = async ({ communityGroupId, activityName, activityValue }) => {
    if (!communityGroupId) {
        throw new Error("no-group-id");
    }
    if (!activityName || !activityValue) {
        throw new Error("fields-empty");
    }

    const newActivity = await new CommunityGroupsActivity({
        activity_name: activityName,
        activity_value: activityValue,
        community_group: communityGroupId,
    }).save();
    console.log("Activity created + " + activityName);
    return newActivity._id;
};
