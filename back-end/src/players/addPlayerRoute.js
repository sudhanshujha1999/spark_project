import { v4 as uuid } from 'uuid';
import { createGroup } from '../groups';
import { createInvitation, sendInvitationEmail } from '../invitations';
import { createMembership } from '../memberships';
import { getRosterById } from '../rosters';
import {
    isLoggedInProtector,
    isVerifiedProtector,
    isOnboardedProtector,
} from '../route-protectors';
import { getSchoolForGroup } from '../schools';
import { getTeamForGroup } from '../teams';
import { createUserInDB, getUserByEmail } from '../users';

export const addPlayerRoute = {
    path: '/rosters/:rosterId/players',
    method: 'post',
    protectors: [
        isLoggedInProtector,
        isVerifiedProtector,
    ],
    handler: async (req, res) => {
        const authUser = req.user;
        const { rosterId } = req.params;
        const { email } = req.body;
        const baseUrl = req.app.get('baseBackEndUrl');

        const user = await getUserByEmail(email);

        const playerId = user
            ? user.id
            : await createUserInDB({ email, membershipTypeId: 'player' });

        const roster = await getRosterById(rosterId);
        const school = await getTeamForGroup(roster);
        const team = await getSchoolForGroup(school);
        const confirmationCode = uuid();

        await sendInvitationEmail({
            email,
            groupName: team.name,
            schoolName: school.name,
            confirmationCode,
            baseUrl,
        });

        const membershipId = await createInvitation({
            email,
            groupId: rosterId,
            userId: playerId, 
            membershipTypeId: 'player',
            invitedById: authUser.uid,
            confirmationCode,
        });

        res.sendStatus(200);
    },
}