import * as admin from 'firebase-admin';

export const updateUser = async (userId, { name, bio, profilePicUrl }) => {
    const userRef = admin.firestore()
        .collection('users')
        .doc(userId);

    await userRef.set({ name, bio, profilePicUrl }, { merge: true });
    const updated = await userRef.get();
    return updated;
}