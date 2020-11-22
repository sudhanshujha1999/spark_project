import { v4 as uuid } from 'uuid';
import { createUserInAuth } from './createUserInAuth';
import { createUserInDB } from './createUserInDB';
import { sendVerificationEmail } from './sendVerificationEmail';

export const createUserRoute = {
    method: 'post',
    path: '/users',
    handler: async (req, res) => {
        const {
            email,
            role,
            password,
        } = req.body;
        const baseVerificationUrl = req.app.get('baseBackEndUrl');

        console.log("Create user route called...");

        const id = await createUserInAuth(email, password);

        const confirmationCode = uuid();
        await createUserInDB({
            id,
            email,
            role,
            confirmationCode,
        });
        await sendVerificationEmail({
            email,
            confirmationCode,
            baseVerificationUrl,
            callback: (error, result) => {
                if (error) {
                    res.sendStatus(500);
                } else {
                    res.status(200).json({ id });
                }
            }
        });

    },
};