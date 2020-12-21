import * as admin from 'firebase-admin';
import { createMembership } from '../memberships';

export const createTeam = async ({ name, game, schoolId, coachId }) => {
    const teamRef = await admin.firestore().collection('groups')
        .add({ name, game, groupType: 'team' });
    const teamId = teamRef.id;
    await createMembership({
        userId: coachId,
        groupId: teamId,
        membershipTypeId: 'coach',
        invitedById: coachId,
    });
    await createMembership({
        userId: teamId,
        groupId: schoolId,
        membershipTypeId: 'subgroup',
        invitedById: coachId,
    });
    return teamId;
}