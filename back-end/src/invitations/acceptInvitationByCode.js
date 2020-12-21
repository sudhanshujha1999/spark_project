import * as admin from 'firebase-admin';
import { createMembership } from '../memberships';
import { getUserByEmail } from '../users';

export const acceptInvitationByCode = async confirmationCode => {
    const store = admin.firestore();
    const querySnapshot = await store.collection('invitations')
        .where('confirmationCode', '==', confirmationCode)
        .get();
    const results = querySnapshot.docs;
    if (results.length === 0) throw new Error('Not found');
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

        await createMembership({
            userId,
            groupId,
            membershipTypeId,
            invitedById,
            createdAt,
            data,
        });
        await store.collection('invitations')
            .doc(invitationRef.id)
            .update({ isAccepted: true });
    }
    return invitationRef.data().email;
}