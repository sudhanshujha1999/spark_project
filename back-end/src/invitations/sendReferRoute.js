import { sendEmail, FROM_TAYLOR } from "../emails";

export const sendReferRoute = {
    path: "/refer",
    method: "post",
    handler: async (req, res) => {
        const { senderEmail, referedEmail } = req.body;

        try {
            const emailText = `
            Hey! Check out Spark Esports at Sparkesports.gg
            refered By: "${senderEmail}".
            `;
            await sendEmail({
                to: referedEmail,
                from: FROM_TAYLOR,
                subject: `Hey! Check out Spark Esports`,
                body: emailText,
            });
            return res.status(200).json({
                message: "Email Sent",
            });
        } catch (e) {
            console.log(e);
            res.status(500).json("Help!!");
        }
    },
};
