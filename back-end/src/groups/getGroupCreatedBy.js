import { Groups, ORGANIZATION } from "../models";

export const getOrganizationCreatedBy = async (userId) => {
    const group = Groups.findOne({
        created_by: userId,
        group_type: ORGANIZATION,
    });
    return group;
};
