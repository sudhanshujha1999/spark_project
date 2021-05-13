// import * as admin from 'firebase-admin';

// export const getUserByAuthId = async id => {
//     const querySnapshot = await admin.firestore().collection('users')
//         .where('authId', '==', id)
//         .get();

//     const docSnapshot = querySnapshot.docs[0];

//     if (!docSnapshot) return null;

//     return {
//         ...docSnapshot.data(),
//         id: docSnapshot.id,
//     };
// }
// MONGO_DB MIGTATION
import { Users } from "../models";

export const getUserByAuthId = async (id) => {
    const user = await Users.findOne({ auth_id: id });

    if (!user) return null;

    return user;
};
