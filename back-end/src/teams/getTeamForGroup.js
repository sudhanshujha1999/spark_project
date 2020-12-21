import * as admin from 'firebase-admin';

export const getTeamForGroup = async group => {
    if (group.groupType === 'team') {
        return group;
    }

    const groupMembershipsQuerySnapshot = await admin.firestore().collection('memberships')
        .where('userId', '==', group.id)
        .get();
    const membershipRef = groupMembershipsQuerySnapshot.docs[0]
    if (!membershipRef) return null;

    const membership = membershipRef.data();
    const parentGroupSnapshot = await admin.firestore().collection('groups')
        .doc(membership.groupId)
        .get();

    const parentGroup = {
        ...parentGroupSnapshot.data(),
        id: parentGroupSnapshot.id,
    };

    return await getTeamForGroup(parentGroup);
}
