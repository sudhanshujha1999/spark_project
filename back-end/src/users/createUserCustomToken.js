import * as admin from "firebase-admin";

export const createUserCustomToken = async (uid) => {
    const auth = admin.auth();
    await auth.revokeRefreshTokens(uid);
    const token = await auth.createCustomToken(uid);
    return token;
};
