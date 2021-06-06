import { v4 as uuid } from "uuid";
import { sendVerificationEmail } from "../email-verification";
import { getAcceptedInvitationsByEmail } from "../invitations";
import { addAuthIdToUser } from "./addAuthIdToUser";
import { createUserInAuth } from "./createUserInAuth";
import { createUserInDB } from "./createUserInDB";
import { getAuthUserExists } from "./getAuthUserExists";
import { getUserByEmail } from "./getUserByEmail";

/*
    This route is used to create new accounts, and is
    used by the CreateAccountPage when a new user signs up
*/
export const createUserRoute = {
    method: "post",
    path: "/users",
    handler: async (req, res) => {
        const {
            email,
            membershipTypeId, // whether they are a "coach" or a "player", CAN I REMOVE IT
            password,
        } = req.body;

        const baseVerificationUrl = req.app.get("baseBackEndUrl");

        try {
            // 1. We need to check to make sure the user doesn't already have an account
            // in Firebase auth under that email, since this will throw an error if they do
            const userAlreadyExists = await getAuthUserExists(email);

            // 2. If the user already exists, send back a response saying so. 409 is the "conflict" status code
            if (userAlreadyExists)
                return res.status(409).json({
                    message:
                        "It looks like there's already an account with that email, please log in",
                });

            // 3. If the user doesn't exist, create a user in Firebase auth with the specified email and password
            const authId = await createUserInAuth(email, password);
            const user = await getUserByEmail(email);

            // 4. Check if the user has ever accepted an invitation (which means we don't need to confirm their email,
            // since we send invitations via email)

            const emailAlreadyConfirmed = await getAcceptedInvitationsByEmail(email);

            // 5. Generate a confirmation code for the user to confirm their email (only if step 4 is false).
            const confirmationObject = emailAlreadyConfirmed
                ? { isConfirmed: true }
                : { confirmationCode: uuid() };

            // 6. Check and see if there's already a user in the DB (not firebase auth) with that email
            // (i.e. this happens when the user is invited to a team or something, and will usually be true)
            if (user) {
                await addAuthIdToUser({
                    userId: user._id,
                    authId,
                    membershipTypeId,
                    ...confirmationObject,
                });
            } else {
                // If there isn't, create one
                await createUserInDB({
                    auth_id: authId,
                    email,
                    membershipTypeId,
                    ...confirmationObject,
                });
            }

            // 7. Send a verification email if the user's email isn't yet confirmed
            // MONGO_DB MIGTATION
            if (!emailAlreadyConfirmed) {
                await sendVerificationEmail({
                    email,
                    ...confirmationObject,
                    baseVerificationUrl,
                });
            }

            res.status(200).json({ id: authId });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Uh oh! Something went wrong..." });
        }
    },
};
