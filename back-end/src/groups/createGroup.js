import * as admin from 'firebase-admin';

export const createGroup = async (groupTypeId, data) => {
    const groups = admin.firestore().collection('groups');
    const docRef = await groups.add({
        ...data,
        groupTypeId,
    });
    return docRef.id;
}