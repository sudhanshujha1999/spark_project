import * as admin from 'firebase-admin';

export const updateUser = async (userId, {
    fullName,
    bio,
}) => {
    const userRef = admin.firestore()
        .collection('users')
        .doc(userId);

    await userRef.set({
        fullName,
        bio,
    }, { merge: true });
    const updated = await userRef.get();
    return updated;
}