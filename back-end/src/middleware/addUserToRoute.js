import * as admin from 'firebase-admin';

export const addUserToRoute = async (req, res, next) => {
    try {
        const token = req.headers.authtoken;
        const user = await admin.auth().verifyIdToken(token);
        req.user = user;
        next();
    } catch (e) {
        next();
    }
}