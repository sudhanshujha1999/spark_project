import * as admin from 'firebase-admin';

export const USER_NOT_FOUND = 'No user found with this confirmation code';
export const EMAIL_ALREADY_VERIFIED = 'Email is already verified';

export const verifyUser = async confirmationCode => {
    const querySnapshot = await admin.firestore()
        .collection('users')
        .where('confirmationCode', '==', confirmationCode)
        .get();
    
    if (querySnapshot.empty) {
        throw new Error(USER_NOT_FOUND);
    }
    
    const result = querySnapshot.docs[0].data();

    if (result.confirmed) {
        throw new Error(EMAIL_ALREADY_VERIFIED);
    }

    const id = querySnapshot.docs[0].id
    console.log(id);

    await admin.firestore()
        .collection('users')
        .doc(id)
        .update({ confirmed: true });
}