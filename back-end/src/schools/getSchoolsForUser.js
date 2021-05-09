import * as admin from 'firebase-admin';

export const getSchoolsForUser = async (userId) => {
    const snapshot = await admin.firestore()
        .collection('schools')
        .where('memberIds', 'array-contains', userId)
        .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}