// import * as admin from 'firebase-admin';

// export const getUserByEmail = async email => {
//     const querySnapshot = await admin.firestore().collection('users')
//         .where('email', '==', email)
//         .get();

//     const userRef = querySnapshot.docs[0];

//     if (!userRef) return null;

//     return {
//         ...userRef.data(),
//         id: userRef.id,
//     };
// }
// MONGO_DB MIGTATION
import { Users } from "../models";

export const getUserByEmail = async (email) => {
    const user = await Users.findOne({ email: email });

    if (!user) return null;

    return user;
};
