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
            // redirect to generic uh-oh page
            console.log("No code!!");
            res.redirect(`${baseUrl}/verification-result?code=err`);
        }

        try {
            await verifyUser(code);
            res.redirect(`${baseUrl}/verification-result?code=ok`);
        } catch (e) {
            if (e.message === USER_NOT_FOUND) {
                // send to user not found page
                res.redirect(`${baseUrl}/verification-result?code=not_found`);
            } else if (e.message === EMAIL_ALREADY_VERIFIED) {
                // send to email already verified page
                res.redirect(`${baseUrl}/verification-result?code=already_verified`);
            } else {
                // send to generic uh-oh page
                console.log(e);
                res.redirect(`${baseUrl}/verification-result?code=err`);
            }
        }
    },
};