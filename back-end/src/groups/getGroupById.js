import * as admin from 'firebase-admin';

export const getGroupById = async id => {
    const docSnapshot = await admin.firestore().collection('group')
        .doc(id)
        .get();

    if (!docSnapshot) return null;
    
    return {
        ...docSnapshot.data(),
        id: docSnapshot.id,
    };
}