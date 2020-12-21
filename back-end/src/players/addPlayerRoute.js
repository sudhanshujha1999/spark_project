import { v4 as uuid } from 'uuid';
import { createGroup } from '../groups';
import { createInvitation, sendInvitationEmail } from '../invitations';
import { createMembership } from '../memberships';
import {
    isLoggedInProtector,
    isVerifiedProtector,
    isOnboardedProtector,
} from '../route-protectors';
import { createUserInDB, getUserByEmail } from '../users';

export const addPlayerRoute = {
    path: '/teams/:teamId/players',
    method: 'post',
    protectors: [
        isLoggedInProtector,
        isVerifiedProtector,
        isOnboardedProtector,
    ],
    handler: async (req, res) => {
        const { teamId } = req.params;
        const { email, groupId, position } = req.body;
        const { user_id: invitedById } = req.user;
        const baseUrl = req.app.get('baseBackEndUrl');

        // Find out if player with email already exists
        const user = await getUserByEmail(email);

        // If user doesn't exist with that email, create a new one
        const userId = user
            ? user.id
            : await createUserInDB({ email, membershipTypeId: 'player' });

        // // Then create a new "membership" that assigns the user as a player to the specified team and roster
        const confirmationCode = uuid();
        const membershipId = await createInvitation({
            email,
            groupId,
            userId, 
            membershipTypeId: 'player',
            invitedById,
            confirmationCode,
            data: { position },
        });

        // // Send an invitation email to the new player's email address
        const emailResult = await sendInvitationEmail({
            userId,
            groupId,
            membershipId,
            baseUrl,
            confirmationCode,
        });

        // TODO: Add error handling if something goes wrong
        res.status(200).json(membershipId);
    },
}