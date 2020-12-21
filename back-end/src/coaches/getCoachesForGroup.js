import * as admin from 'firebase-admin';

export const getCoachesForGroup = async groupId => {
    const coachMembershipsSnapshot = await admin.firestore().collection('memberships')
        .where('groupId', '==', groupId)
        .where('membershipTypeId', '==', 'coach')
        .get();
    const coachMemberships = coachMembershipsSnapshot.docs.map(doc => doc.data());
    const coachDocs = await Promise.all(
        coachMemberships.map(membership => admin.firestore().collection('users').doc(membership.userId).get()),
    );
    const coaches = coachDocs.map(doc => ({ ...doc.data(), id: doc.id }));

    return coaches;
}