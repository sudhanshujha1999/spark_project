import * as admin from 'firebase-admin';
import { sendVerificationEmail } from './sendVerificationEmail';

export const resendVerificationEmailRoute = {
    path: '/resend-verification/:userId',
    method: 'post',
    handler: async (req, res) => {
        const baseUrl = req.app.get('baseBackEndUrl');
        const { userId } = req.params;
        const docSnapshot = await admin.firestore().collection('users').doc(userId).get();
        const user = docSnapshot.data();
        const { email, confirmationCode } = user;
        sendVerificationEmail({
            email,
            confirmationCode,
            baseVerificationUrl: baseUrl,
            callback: (error, result) => {
                if (error) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            }
        });
    },
};