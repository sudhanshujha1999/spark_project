import * as admin from 'firebase-admin';

const getTeamForGroup = async group => {
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

export const getTeamsForUserByPosition = async (userId, membershipTypeId) => {
    const userMembershipsSnapshot = await admin.firestore().collection('memberships')
        .where('userId', '==', userId)
        .where('membershipTypeId', '==', membershipTypeId)
        .get();

    const userGroupDocs = await Promise.all(
        userMembershipsSnapshot.docs.map(membershipDoc =>
            admin.firestore().collection('groups').doc(membershipDoc.data().groupId).get()),
    );

    const userTeams = await Promise.all(
        userGroupDocs.map(groupDoc => getTeamForGroup({ ...groupDoc.data(), id: groupDoc.id })),
    )

    return userTeams;
}