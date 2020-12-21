import { createGroup } from '../groups';
import { createMembership } from '../memberships';
import {
    isLoggedInProtector,
    isVerifiedProtector,
    isOnboardedProtector,
} from '../route-protectors';

export const createTeamRoute = {
    path: '/teams',
    method: 'post',
    protectors: [
        isLoggedInProtector,
        isVerifiedProtector,
        isOnboardedProtector,
    ],
    handler: async (req, res) => {
        const { name, game, description, schoolId } = req.body;
        const { user_id: userId } = req.user;
        const groupId = await createGroup('team', { name, game, description });

        // TODO: Make sure user is the coach of the school

        await createMembership({
            userId,
            groupId,
            membershipTypeId: 'coach',
            data: {},
        });
        await createMembership({
            memberId: groupId,
            groupId: schoolId,
            membershipId: 'subgroup',
            data: {},
        });
        res.status(200).send(groupId);
    },
}
