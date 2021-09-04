import { Groups, ORGANIZATION } from "../models";

export const getOrganizationCreatedBy = async (userId, organizationId) => {
    const group = Groups.findOne({
        _id: organizationId,
        created_by: userId,
        group_type: ORGANIZATION,
    });
    return group;
};
