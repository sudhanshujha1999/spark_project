import { v4 as uuid } from 'uuid';

export const createInvitationRoute = {
    path: '/invitations',
    method: 'post',
    handler: async (req, res) => {
        const { email, groupid, membershipTypeId } = req.body;
        const { user_id: invitedById } = req.user;
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