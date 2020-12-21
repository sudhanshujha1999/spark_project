import * as admin from 'firebase-admin';

export const getUserByAuthId = async id => {
    const querySnapshot = await admin.firestore().collection('users')
        .where('authId', '==', id)
        .get();

    const docSnapshot = querySnapshot.docs[0];

    if (!docSnapshot) return null;
    
    return {
        ...docSnapshot.data(),
        id: docSnapshot.id,
    };
}