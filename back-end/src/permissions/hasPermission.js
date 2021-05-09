import * as admin from 'firebase-admin';

/*
    Permissions in the database look like this:

    {
        userId: '123123123',
        groupId: '163456345734567',
        permissionType: 'CAN_EDIT_EVENTS', // These are in permissionTypes.js
    }
*/
export const hasPermission = async ({ userId, groupId, permissionType }) => {
    const resultSnapshot = await admin.firestore()
        .collection('permissions')
        .where('userId', '==', userId)
        .where('groupId', '==', groupId)
        .where('permissionType', '==', permissionType)
        .get();
    return resultSnapshot.docs.length > 0;
}