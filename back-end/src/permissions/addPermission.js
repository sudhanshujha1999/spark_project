import { connectToDb } from '../util';

export const addPermission = async ({ userId, groupId, permissionType }) => {
    const db = connectToDb('spark-esports-db');
    return await db.collection('permissions').insertOne({ userId, groupId, permissionType });
}