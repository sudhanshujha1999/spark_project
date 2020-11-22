import * as admin from 'firebase-admin';

export const createUserInDB = async ({ id, email, role, confirmationCode }) => {
    const createdAt = Date.now();

    const newUser = {
        email,
        role,
        createdAt,
        confirmationCode,
        confirmed: false,
        onboarded: false,
    };

    await admin.firestore().collection('users').doc(id).set(newUser);
}