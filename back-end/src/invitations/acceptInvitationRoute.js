import { getUserByEmail } from "../users";
import { acceptInvitationByCode } from "./acceptInvitationByCode";

/*
    This is the route that will be hit when a user accepts an invitation by
    clicking on the "accept" button on the InvitationLandingPage
*/
export const acceptInvitationRoute = {
    path: "/invitations/:confirmationCode/accept",
    method: "post",
    handler: async (req, res) => {
        // 1. Get the confirmation code that we generated when we sent the invitation
        const { confirmationCode } = req.params;

        try {
            // 2. Accept the invitation - this will move the invitation over to
            // the "memberships" collection
            const email = await acceptInvitationByCode(confirmationCode);

            // 3. The user already has an account (we created this in the onboarding route), but
            // we need to know if they've already confirmed their account or not and send this back
            // to the client. The client will use this info to decide whether to send the user to the
            // sign-up or log-in page
            const user = await getUserByEmail(email);
            res.status(200).json({ email, isConfirmed: user && user.isConfirmed });
        } catch (e) {
            console.log(e);

            // If something went wrong, it probably means there was no corresponding invitation
            if (e.message == "Not found") {
                res.status(404).json({
                    message: "No invitation exists with the corresponding confirmation code",
                });
            } else {
                res.status(500).json({ message: "Unable to accept invitation" });
            }
        }
    },
};
