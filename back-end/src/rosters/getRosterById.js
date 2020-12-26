import * as admin from 'firebase-admin';

export const getRosterById = async rosterId => {
    const docSnapshot = await admin.firestore().collection('rosters')
        .doc(rosterId)
        .get();

    return {
        ...docSnapshot.data(),
        id: docSnapshot.id,
    };
}