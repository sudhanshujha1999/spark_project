// import * as admin from 'firebase-admin';

// export const createUserInDB = async ({ id, email, membershipTypeId, confirmationCode, isConfirmed = false }) => {
//     const createdAt = Date.now();

//     const newUser = {
//         authId: id,
//         email,
//         createdAt,
//         confirmationCode,
//         membershipTypeId,
//         isConfirmed,
//         isOnboarded: false,
//     };

//     const docRef = await admin.firestore().collection('users').add(newUser);
//     return docRef.id;
// }
// MONGO_DB MIGTATION
import { Users } from "../models";
export const createUserInDB = async ({ auth_id, email, confirmationCode, isConfirmed = false }) => {
    const newUser = new Users({
        auth_id,
        email,
        confirmationCode,
        isConfirmed,
        isOnboarded: false,
    });
    await newUser.save();
    return newUser._id;
};
