import { confirmInvitationByCode } from './confirmInvitationByCode';

export const confirmInvitationRoute = {
    path: '/invitations/confirm',
    method: 'get',
    handler: async (req, res) => {
        const { code } = req.query;
        const baseUrl = req.app.get('baseFrontEndUrl');

        try {
            await confirmInvitationByCode(code);
            res.redirect(`${baseUrl}/accept-invitation-result?code=ok`);
        } catch (e) {
            console.log(e);
            res.status(500).send();
        }
    },
}