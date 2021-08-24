import * as admin from "firebase-admin";

export const createUserInAuth = async (email, password) => {
    const user = await admin.auth().createUser({ email, password });
    return user.uid;
};
