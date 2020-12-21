import { getUserByEmail } from '../users';
import { acceptInvitationByCode } from './acceptInvitationByCode';

export const acceptInvitationRoute = {
    path: '/invitations/:confirmationCode/accept',
    method: 'post',
    handler: async (req, res) => {
        const { confirmationCode } = req.params;
        
        try {
            const email = await acceptInvitationByCode(confirmationCode);
            const user = await getUserByEmail(email);
            res.status(200).json({ email, isConfirmed: user && user.isConfirmed });
        } catch (e) {
            console.log(e);
            res.status(404).json('No invitation exists with the corresponding confirmation code');
        }
    },
}