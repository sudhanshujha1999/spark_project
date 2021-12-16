import { CommunityGroups } from "../models";

export const exceedeGroupsLimit = async ({ organizationId }) => {
    const groupsForOrganization = await CommunityGroups.find({
        "member_organizations.id": organizationId,
    }).lean();
    if (groupsForOrganization.length >= 4) {
        return true;
    } else {
        return false;
    }
};
