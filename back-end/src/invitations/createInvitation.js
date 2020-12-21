import * as admin from 'firebase-admin';

const membershipTypes = {
    coach: {},
    player: {},
}

export const createInvitation = async ({
    email,
    userId,
    groupId,
    membershipTypeId,
    invitedById,
    confirmationCode,
    data, // any extra data about the membership (i.e. "position" for players)
}) => {
    const createdAt = new Date();
    const docRef = await admin.firestore().collection('invitations')
        .add({
            email,
            userId,
            groupId,
            membershipTypeId,
            invitedById,
            confirmationCode,
            data,
            createdAt,
        });

    return docRef.id;
}