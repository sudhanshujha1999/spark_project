import { sendVerificationEmail } from "./sendVerificationEmail";
import { getUserByAuthId } from "../users";

export const resendVerificationEmailRoute = {
    path: "/resend-verification/:userId",
    method: "post",
    handler: async (req, res) => {
        const baseUrl = req.app.get("baseBackEndUrl");
        const { userId: authId } = req.params;
        try {
            console.log(authId);
            const user = await getUserByAuthId(authId);
            const { email, confirmationCode } = user;
            console.log(user);
            const result = await sendVerificationEmail({
                email,
                confirmationCode,
                baseVerificationUrl: baseUrl,
            });
            return res.sendStatus(200);
        } catch (e) {
            console.log(e.emssage);
            return res.sendStatus(500);
        }
    },
};
