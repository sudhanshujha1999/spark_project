import * as admin from 'firebase-admin';

export const getSchoolForGroup = async group => {
    const schoolSnapshot = await admin.firestore().collection('groups')
        .where('schoolId', '==', group.schoolId)
        .get();

    return schoolSnapshot.docs[0] && { id: schoolSnapshot.id, ...schoolSnapshot.docs[0].data() };
}