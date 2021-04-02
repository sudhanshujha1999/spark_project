import admin from 'firebase-admin';

export const getAuthUserExists = async email => {
    return admin.auth().getUserByEmail(email).then(() => true).catch(() => false);
}