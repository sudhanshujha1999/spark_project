import * as admin from 'firebase-admin';

export const createMembership = async ({
    userId,     // the id of the user in this relationship
    groupId,    // the id of the group that they belong to
    membershipTypeId, // the id of the type of membership (i.e. "coach", "player", etc.)
    invitedById, // the id of the user that sent the invitation 
    data,  // extra info necessary for the position (i.e. "position" and "riotId" for players)
}) => {
    const createdAt = new Date();
    const store = admin.firestore();
    const result = await store.collection('memberships').add({
        userId,
        groupId,
        membershipTypeId,
        invitedById,
        createdAt,
        data,
    });
    return result.id;
}