import * as admin from 'firebase-admin';
import { getInvitationsForRoster } from '../invitations';
import { getPlayersForRoster } from '../players';

export const getRostersForTeam = async teamId => {
    const teamMembershipsQuerySnapshot = await admin.firestore().collection('memberships')
        .where('groupId', '==', teamId)
        .get();
    
    const teamMemberships = teamMembershipsQuerySnapshot.docs
        .map(doc => doc.data())
        .filter(membership => membership.membershipTypeId === 'subgroup');

    const rosterDocs = await Promise.all(
        teamMemberships.map(membership => 
            admin.firestore().collection('groups').doc(membership.userId).get(),
        ),
    );

    const rosters = rosterDocs
        .map(doc => ({ ...doc.data(), id: doc.id }))

    const populatedRosters = await Promise.all(
        rosters.map(roster => (async () => ({
            ...roster,
            players: await getPlayersForRoster(roster.id),
            invitations: await getInvitationsForRoster(roster.id),
        }))()),
    );

    return populatedRosters;
};