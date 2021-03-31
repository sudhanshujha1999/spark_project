import { connectToDb } from '../util';

/*
    Permissions in the database look like this:

    {
        _id: ObjectId('asdasdfasdfsf23543q45'),
        userId: '123123123',
        groupId: '163456345734567',
        permissionType: 'CAN_EDIT_EVENTS', // These are in permissionTypes.js
    }
*/
export const hasPermission = async ({ userId, groupId, permissionType }) => {
    const db = connectToDb('spark-esports-db');
    const result = await db.collection('permissions').findOne({ userId, groupId, permissionType });
return !!result;
}