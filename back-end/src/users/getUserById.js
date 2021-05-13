// import * as admin from 'firebase-admin';

// export const getUserById = async id => {
//     const docSnapshot = await admin.firestore().collection('users')
//         .doc(id)
//         .get();

//     if (!docSnapshot) return null;

//     return {
//         ...docSnapshot.data(),
//         id: docSnapshot.id,
//     };
// }
// MONGO_DB MIGTATION
import { Users } from "../models";

export const getUserById = async (id) => {
    const user = await Users.findById(id);

    if (!user) return null;

    return user;
};
