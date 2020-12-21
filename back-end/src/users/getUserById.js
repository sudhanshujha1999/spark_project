import * as admin from 'firebase-admin';

export const getUserById = async id => {
    const docSnapshot = await admin.firestore().collection('users')
        .doc(id)
        .get();

    if (!docSnapshot) return null;
    
    return {
        ...docSnapshot.data(),
        id: docSnapshot.id,
    };
}