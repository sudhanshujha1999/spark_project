import * as admin from 'firebase-admin';

export const getPlayer = async userId => {
    const doc = await admin.firestore().collection('users')
        .doc(userId)
        .get();

    return {
        ...doc.data(),
        id: doc.id,
    };
}