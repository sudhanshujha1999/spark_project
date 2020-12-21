import * as admin from 'firebase-admin';
import { createMembership } from '../memberships';

export const createSchool = async ({ name, coachId }) => {
    const schoolRef = await admin.firestore().collection('groups')
        .add({ name, groupType: 'school' });
    const schoolId = schoolRef.id;
    await createMembership({
        userId: coachId,
        groupId: schoolId,
        membershipTypeId: 'coach',
        invitedById: coachId,
    });
    return schoolId;
}