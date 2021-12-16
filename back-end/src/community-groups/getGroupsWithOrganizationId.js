import { CommunityGroups, CommunityGroupsActivity } from "../models";

export const getGroupsWithOrganizationId = async (organizationId = "") => {
    if (!organizationId) {
        throw new Error("no-org-found");
    }
    const groups = await CommunityGroups.find({
        "member_organizations.id": organizationId,
    }).lean();
    const groupIds = groups.map((group) => group._id);
    const activities = await CommunityGroupsActivity.aggregate([
        {
            $match: { community_group: { $in: groupIds } },
        },
        {
            $limit: 10,
        },
        {
            $sort: { createdAt: -1 },
        },
        {
            $group: {
                _id: "$community_group",
                activities: {
                    $push: {
                        name: "$activity_name",
                        value: "$activity_value",
                        createdAt: "$createdAt",
                    },
                },
            },
        },
    ]);
    const groupedActivitiesData = activities.reduce((grouped, data) => {
        grouped[`${data._id}`] = data;
        return grouped;
    }, {});
    const groupsWithActivity = groups.map((group) => ({
        ...group,
        activities: groupedActivitiesData[`${group._id}`]
            ? groupedActivitiesData[`${group._id}`]?.activities || []
            : [],
    }));
    return groupsWithActivity;
};
