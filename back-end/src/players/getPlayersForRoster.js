import * as admin from 'firebase-admin';
import { getPlayer } from './getPlayer';

export const getPlayersForRoster = async rosterId => {
    const membershipsSnapshot = await admin.firestore().collection('memberships')
        .where('groupId', '==', rosterId)
        .get();
    const memberships = membershipsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    const playerMemberships = memberships.filter(membership => membership.membershipTypeId === 'player');
    const players = await Promise.all(
        playerMemberships.map(membership => membership.userId && getPlayer(membership.userId)),
    );

    return players;
}