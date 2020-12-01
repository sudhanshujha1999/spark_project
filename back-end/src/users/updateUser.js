import * as admin from 'firebase-admin';

export const updateUser = async (userId, { firstName, lastName, bio, otherEmails }) => {
    const userRef = admin.firestore()
        .collection('users')
        .doc(userId);

    await userRef.set({ firstName, lastName, bio, otherEmails }, { merge: true });
    const updated = await userRef.get();
    return updated;
}