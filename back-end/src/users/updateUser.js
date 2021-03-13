import * as admin from "firebase-admin";

export const updateUser = async (userId, { fullName, bio, url }) => {
    const userRef = admin.firestore().collection("users").doc(userId);
    let updateObject = {};
    if (fullName) {
        updateObject.fullName = fullName;
    }
    if (bio) {
        updateObject.bio = bio;
    }
    if (url) {
        updateObject.url = url;
    }
    await userRef.set(updateObject, { merge: true });
    const updated = await userRef.get();
    return updated;
};
