import * as admin from 'firebase-admin';

export const isCoachForTeam = async (coachId, teamId) => {
    const querySnapshot = await admin.firestore().collection('memberships')
        .where('userId', '==', coachId)
        .where('groupId', '==', teamId)
        .where('membershipTypeId', '==', 'coach')
        .get();

    return querySnapshot.docs.length > 0;
}