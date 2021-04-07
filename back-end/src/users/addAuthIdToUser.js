import * as admin from 'firebase-admin';

export const addAuthIdToUser = async ({ userId, authId, membershipTypeId, confirmationCode, isConfirmed = false }) => {
    await admin.firestore().collection('users')
        .doc(userId)
        .update({ authId, confirmationCode, isConfirmed, membershipTypeId });
}