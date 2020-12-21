import * as admin from 'firebase-admin';

export const createUserInDB = async ({ id, email, membershipTypeId, confirmationCode }) => {
    const createdAt = Date.now();

    const newUser = {
        authId: id,
        email,
        createdAt,
        confirmationCode,
        membershipTypeId,
        isConfirmed: false,
        isOnboarded: false,
    };

    await admin.firestore().collection('users').add(newUser);
}