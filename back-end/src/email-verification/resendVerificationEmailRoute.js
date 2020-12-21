import * as admin from 'firebase-admin';
import { sendVerificationEmail } from './sendVerificationEmail';
import { getUserByAuthId } from '../users';

export const resendVerificationEmailRoute = {
    path: '/resend-verification/:userId',
    method: 'post',
    handler: async (req, res) => {
        const baseUrl = req.app.get('baseBackEndUrl');
        const { userId: authId } = req.params;
        const user = await getUserByAuthId(authId);
        const { email, confirmationCode } = user;

        try {
            const result = await sendVerificationEmail({
                email,
                confirmationCode,
                baseVerificationUrl: baseUrl,
            });
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    },
};