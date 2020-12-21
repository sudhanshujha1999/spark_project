import * as admin from 'firebase-admin';

export const getInvitationsForRoster = async rosterId => {
    const invitationsSnapshot = await admin.firestore().collection('invitations')
        .where('groupId', '==', rosterId)
        .get();
   const invitations = invitationsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
   return invitations.filter(invitation => !invitation.isAccepted);
}
