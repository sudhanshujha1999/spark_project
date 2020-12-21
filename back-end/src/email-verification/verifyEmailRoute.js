import {
    verifyUser,
    USER_NOT_FOUND,
    EMAIL_ALREADY_VERIFIED,
} from './verifyUser';

export const verifyEmailRoute = {
    path: '/verify',
    method: 'get',
    handler: async (req, res) => {
        const { code } = req.query;
        const baseUrl = req.app.get('baseFrontEndUrl');

        if (!code) {
            res.redirect(`${baseUrl}/verification-result?code=err`);
        }

        try {
            await verifyUser(code);
            res.redirect(`${baseUrl}/verification-result?code=ok`);
        } catch (e) {
            console.log(e);
            if (e.message === USER_NOT_FOUND) {
                res.redirect(`${baseUrl}/verification-result?code=not_found`);
            } else if (e.message === EMAIL_ALREADY_VERIFIED) {
                res.redirect(`${baseUrl}/verification-result?code=already_verified`);
            } else {
                res.redirect(`${baseUrl}/verification-result?code=err`);
            }
        }
    },
};