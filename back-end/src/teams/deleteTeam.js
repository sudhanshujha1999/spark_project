import * as admin from 'firebase-admin';

export const deleteTeam = async teamId => {
    await admin.firestore().collection('groups').doc(teamId).delete();

    const membershipsSnapshot = await admin.firestore()
        .collection('memberships')
        .where('groupId', '==', teamId)
        .get();
    const invitationsSnapshot = await admin.firestore()
        .collection('invitations')
        .where('groupId', '==', teamId)
        .get();

    var batch = admin.firestore().batch();

    membershipsSnapshot.forEach(doc => {
        batch.delete(doc.ref);
    });

    invitationsSnapshot.forEach(doc => {
        batch.delete(doc.ref);
    });

    await batch.commit();
}