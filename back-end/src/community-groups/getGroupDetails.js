import { CommunityGroups, CommunityGroupsActivity, Groups, ORGANIZATION } from "../models";
export const getGroupDetails = async (groupId, organizationId) => {
    const group = await CommunityGroups.findOne({
        _id: groupId,
        "member_organizations.id": organizationId,
    }).lean();
    if (!group) {
        throw new Error("no-group-found");
    }
    const groupActivity = await CommunityGroupsActivity.find({ community_group: groupId });
    const { member_organizations, ...rest } = group;
    const membersId = member_organizations.map(({ id }) => id);
    const memberOrganizations = await Groups.find({
        group_type: ORGANIZATION,
        _id: { $in: membersId },
    }).lean();

    return { ...rest, memberOrganizations, groupActivity };
};
