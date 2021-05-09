import { v4 as uuid } from 'uuid';
import { hasPermission, ADMIN } from '../permissions';

export const createInvitationRoute = {
    path: '/invitations',
    method: 'post',
    handler: async (req, res) => {
        const { email, groupId, membershipTypeId } = req.body;
        const canCreate = await hasPermission({ userId, groupId, membershipType: ADMIN });
        if (!canCreate) return res.sendStatus(403);

        const confirmationCode = uuid();
        const baseUrl = req.app.get('baseBackEndUrl');
        const user = await getUserByEmail(email);
        const userId = user.id;
        const newInvitation = { userId, groupId, membershipTypeId, invitedById, confirmationCode, baseUrl, data: {} };

        try {
            await createInvitation(newInvitation);
            await sendInvitationEmail(newInvitation);
        } catch (e) {
            res.status(500).json('Help!!');
        }
    },
}