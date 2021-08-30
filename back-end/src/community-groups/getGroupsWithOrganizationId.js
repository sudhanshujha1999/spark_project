import { CommunityGroups } from "../models";

export const getGroupsWithOrganizationId = async (organizationId = "") => {
    if (!organizationId) {
        throw new Error("no-org-found");
    }
    const groups = await CommunityGroups.find({
        "member_organizations.id": organizationId,
    });
    return groups;
};
