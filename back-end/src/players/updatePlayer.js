import * as admin from 'firebase-admin';

export const updatePlayer = async (userId, updates) => {
    await admin.firestore().collection('users').doc(userId).update(updates);
}