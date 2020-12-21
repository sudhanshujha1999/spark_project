import * as admin from 'firebase-admin';

export const getById = async (collectionName, id) => {
    const docSnapshot = await admin.firestore().collection(collectionName)
        .doc(id)
        .get();

    if (!docSnapshot) return null;
    
    return {
        ...docSnapshot.data(),
        id: docSnapshot.id,
    };
}