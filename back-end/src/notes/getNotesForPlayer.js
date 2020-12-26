import * as admin from 'firebase-admin';

export const getNotesForPlayer = async ({ coachId, playerId }) => {
    const querySnapshot = await admin.firestore().collection('notes')
        .where('coachId', '==', coachId)
        .where('playerId', '==', playerId)
        .get();

    return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        id: doc.id,
    }));
}