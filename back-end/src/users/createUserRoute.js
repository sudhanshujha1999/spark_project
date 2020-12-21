import { v4 as uuid } from 'uuid';
import { sendVerificationEmail } from '../email-verification';
import { addAuthIdToUser } from './addAuthIdToUser';
import { createUserInAuth } from './createUserInAuth';
import { createUserInDB } from './createUserInDB';
import { getUserByEmail } from './getUserByEmail';

export const createUserRoute = {
    method: 'post',
    path: '/users',
    handler: async (req, res) => {
        const {
            email,
            membershipTypeId,
            password,
        } = req.body;
        const baseVerificationUrl = req.app.get('baseBackEndUrl');

        try {
            const authId = await createUserInAuth(email, password);
            const user = await getUserByEmail(email);
            const confirmationCode = uuid();

            // Check and see if there's already a user in the database with that email
            // (i.e. this happens when the user is invited to a team or something)
            if (!user) {
                await createUserInDB({
                    id: authId,
                    email,
                    membershipTypeId,
                    confirmationCode,
                });
            } else {
                await addAuthIdToUser({
                    userId: user.id,
                    authId,
                    membershipTypeId,
                    confirmationCode,
                });
            }

            await sendVerificationEmail({
                email,
                confirmationCode,
                baseVerificationUrl,
            });

            res.status(200).json({ id: authId });
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    },
};