import { Users } from "../models";
// import * as admin from 'firebase-admin';

// export const addAuthIdToUser = async ({ userId, authId, membershipTypeId, confirmationCode, isConfirmed = false }) => {
//     await admin.firestore().collection('users')
//         .doc(userId)
//         .update({ authId, confirmationCode, isConfirmed, membershipTypeId });
// }

// MONGO_DB MIGTATION
export const addAuthIdToUser = async ({
    userId,
    authId,
    confirmationCode,
    isConfirmed = false,
}) => {
    await Users.findByIdAndUpdate(userId, {
        $set: {
            auth_id: authId,
            confirmationCode,
            isConfirmed,
        },
    });
};
