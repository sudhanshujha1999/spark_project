import * as admin from 'firebase-admin';
import { createMembership } from '../memberships';
import { getUserByEmail } from '../users';

export const acceptInvitationByCode = async confirmationCode => {
    const store = admin.firestore();
    
    // 1. Get all the invitation with the corresponding confirmationCode
    const querySnapshot = await store.collection('invitations')
        .where('confirmationCode', '==', confirmationCode)
        .get();
    const results = querySnapshot.docs;

    // 2. The invitation might not exist. If it doesn't, throw an error
    if (results.length === 0) throw new Error('Not found');
    
    // 3. If the invitation hasn't been accepted yet...
    const invitationRef = results[0];
    if (invitationRef && !invitationRef.data().isAccepted) {
        const {
            email,
            groupId,
            membershipTypeId,
            invitedById,
            createdAt,
            data,
        } = invitationRef.data();

        const user = await getUserByEmail(email);
        const userId = user.id;

        // 4. Create a membership with data from the invitation
        await createMembership({
            userId,
            groupId,
            membershipTypeId,
            invitedById,
            createdAt,
            data,
        });

        // 5. And mark the invitation as accepted
        await store.collection('invitations')
            .doc(invitationRef.id)
            .update({ isAccepted: true });
    }
    
    // Return the email of the user who accepted the invitation so we can find them
    return invitationRef.data().email;
}