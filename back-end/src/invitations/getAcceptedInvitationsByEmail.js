// import * as admin from 'firebase-admin';

// export const getAcceptedInvitationsByEmail = async email => {
//     const querySnapshot = await admin.firestore()
//         .collection('invitations')
//         .where('email', '==', email)
//         .where('isAccepted', '==', true)
//         .get();
//     return querySnapshot.docs.map(doc => doc.data());
// }
import { Invitation } from "../models";

export const getAcceptedInvitationsByEmail = async (email) => {
    const acceptedInvitations = await Invitation.find({
        email: email,
        isConfirmed: true,
    });
    return acceptedInvitations.length > 0;
};
