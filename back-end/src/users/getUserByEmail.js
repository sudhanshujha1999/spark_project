import * as admin from 'firebase-admin';

export const getUserByEmail = async email => {
    const querySnapshot = await admin.firestore().collection('users')
        .where('email', '==', email)
        .get();

    const userRef = querySnapshot.docs[0];

    if (!userRef) return null;
    
    return {
        ...userRef.data(),
        id: userRef.id,
    };
}