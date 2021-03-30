import { connectToDb } from '../util';

export const removePermission = async ({ userId, groupId, permissionType }) => {
    const db = connectToDb('spark-esports-db');
    return await db.collection('permissions').remove({ userId, groupId, permissionType });
}