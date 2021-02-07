import * as admin from 'firebase-admin';

export const deleteRoster = async rosterId => {
    await admin.firestore().collection('groups').doc(rosterId).delete();

    const membershipsSnapshot = await admin.firestore()
        .collection('memberships')
        .where('groupId', '==', rosterId)
        .get();

    const invitationsSnapshot = await admin.firestore()
        .collection('invitations')
        .where('groupId', '==', rosterId)
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
