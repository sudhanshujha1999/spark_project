import * as admin from 'firebase-admin';

export const setUserToOnboarded = async userId => {
    await admin.firestore().collection('users')
        .doc(userId)
        .update({ isOnboarded: true });
}