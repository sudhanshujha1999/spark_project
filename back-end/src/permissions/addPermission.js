import * as admin from 'firebase-admin';
import { connectToDb } from '../util';

export const addPermission = ({ userId, groupId, permissionType }) => {
    return admin.firestore().collection('permissions').add({ userId, groupId, permissionType });
}