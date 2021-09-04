import { CommunityGroups } from "../models";

export const exceedeGroupsLimit = async ({ organizationId }) => {
    const groupsForOrganization = await CommunityGroups.find({
        member_organizations: organizationId,
    });
    if (groupsForOrganization.length >= 4) {
        return true;
    } else {
        return false;
    }
};
