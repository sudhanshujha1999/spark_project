import * as admin from 'firebase-admin';

export const isCoachForSchool = async (coachId, schoolId) => {
    const querySnapshot = await admin.firestore().collection('memberships')
        .where('userId', '==', coachId)
        .where('groupId', '==', schoolId)
        .where('membershipTypeId', '==', 'coach')
        .get();

    return querySnapshot.docs.length > 0;
}