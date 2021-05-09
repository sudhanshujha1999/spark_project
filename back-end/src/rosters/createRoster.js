import * as admin from 'firebase-admin';
import { createMembership } from '../memberships';

export const createRoster = async ({ name, teamId, schoolId, coachId }) => {
    const rosterRef = await admin.firestore().collection('groups')
        .add({ name, schoolId, teamId, groupType: 'roster' });
    const rosterId = rosterRef.id;
    await createMembership({
        userId: coachId,
        groupId: rosterId,
        membershipTypeId: 'coach',
        invitedById: coachId,
    });
    await createMembership({
        userId: rosterId,
        groupId: teamId,
        membershipTypeId: 'subgroup',
        invitedById: coachId,
    });
    return rosterId;
}