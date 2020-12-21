import { createGroup } from '../groups';
import { createMembership } from '../memberships';
import {
    isLoggedInProtector,
    isVerifiedProtector,
    isOnboardedProtector,
} from '../route-protectors';

export const createSchoolRoute = {
    path: '/schools',
    method: 'post',
    protectors: [
        isLoggedInProtector,
        isVerifiedProtector,
        isOnboardedProtector,
    ],
    handler: async (req, res) => {
        const { name, city } = req.body;
        const { user_id: userId } = req.user;
        const groupId = await createGroup('school', { name, city });
        await createMembership({
            userId,
            groupId,
            membershipId: 'coach',
            data: {},
        });
        res.status(200).send(groupId);
    },
}