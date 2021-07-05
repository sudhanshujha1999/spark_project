import { Groups, ORGANIZATION } from "../models";
export const isCoachForSchool = async (coachId, organizationId) => {
    // check for permissions here
    const user_organization = await Groups.findOne({
        parent_groups: organizationId,
        group_type: ORGANIZATION,
        admins: { $elemMatch: { id: coachId } },
    });

    return user_organization ? true : false;
};
