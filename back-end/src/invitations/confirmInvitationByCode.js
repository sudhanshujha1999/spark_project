import * as admin from 'firebase-admin';

export const confirmInvitationByCode = async confirmationCode => {
    const invitations = admin.firestore().collection('invitations');
    const invitationQuerySnapshot = await invitations
        .where('confirmationCode', '==', confirmationCode)
        .get();
    const invitationRef = invitationQuerySnapshot.docs[0];
    const invitation = invitationRef.data()

    if (!invitation) throw new Error('Invitation not found');

    const users = admin.firestore().collection('users');
    const invitedUserQuerySnapshot = await users
        .where('email', '==', invitation.email)
        .get();
    const invitedUserRef = invitedUserQuerySnapshot.docs[0];

    if (!invitedUserRef) throw new Error('User with email doesn\'t exist');

    const memberships = admin.firestore().collection('memberships');
    await memberships.doc(invitationRef.id).set({
        ...invitationRef.data(),
        userId: invitedUserRef.id
    });

    return invitationRef.id;
}