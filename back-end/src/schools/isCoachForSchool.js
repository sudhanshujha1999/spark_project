// import * as admin from 'firebase-admin';

// export const isCoachForSchool = async (coachId, schoolId) => {
//     const querySnapshot = await admin.firestore().collection('memberships')
//         .where('userId', '==', coachId)
//         .where('groupId', '==', schoolId)
//         .where('membershipTypeId', '==', 'coach')
//         .get();

//     return querySnapshot.docs.length > 0;
// }

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
