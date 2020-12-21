import * as admin from 'firebase-admin';

export const getPlayersForTeam = async teamId => {
    const membershipsSnapshot = await admin.firestore().collection('memberships')
        .where('groupId', '==', teamId)
        .get();

    const invitationsSnapshot = await admin.firestore().collection('invitations')
        .where('groupId', '==', teamId)
        .get();

    const results = [...membershipsSnapshot.docs, ...invitationsSnapshot.docs];

    return results.map(result => ({
        ...result.data(),
        id: result.id,
    }));
}