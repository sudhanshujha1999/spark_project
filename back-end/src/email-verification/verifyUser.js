// import * as admin from 'firebase-admin';

// export const USER_NOT_FOUND = 'No user found with this confirmation code';
// export const EMAIL_ALREADY_VERIFIED = 'Email is already verified';

// export const verifyUser = async confirmationCode => {
//     const auth = admin.auth();
//     const users = admin.firestore().collection('users');
//     const querySnapshot = await users.where('confirmationCode', '==', confirmationCode).get();

//     if (querySnapshot.empty) {
//         throw new Error(USER_NOT_FOUND);
//     }

//     const userDoc = querySnapshot.docs[0];
//     const user = userDoc.data();

//     if (user.isConfirmed) {
//         throw new Error(EMAIL_ALREADY_VERIFIED);
//     }

//     await auth.updateUser(user.authId, { emailVerified: true });
//     await users.doc(userDoc.id).update({ isConfirmed: true });

//     return user;
// }
// MONGO_DB MIGTATION
import * as admin from "firebase-admin";
import { Users } from "../models";

export const USER_NOT_FOUND = "No user found with this confirmation code";
export const EMAIL_ALREADY_VERIFIED = "Email is already verified";

export const verifyUser = async (confirmationCode) => {
    const auth = admin.auth();
    const user = await Users.findOne({ confirmationCode: confirmationCode });

    if (!user) {
        throw new Error(USER_NOT_FOUND);
    }

    if (user.isConfirmed) {
        throw new Error(EMAIL_ALREADY_VERIFIED);
    }

    await auth.updateUser(user.auth_id, { emailVerified: true });
    await user.updateOne({ isConfirmed: true });
    await user.save();

    return user;
};
