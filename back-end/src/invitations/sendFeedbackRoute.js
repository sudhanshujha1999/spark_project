import { sendEmail, FROM_CUSTOMER_SERVICE } from "../emails";

export const sendFeedbackRoute = {
    path: "/feedback",
    method: "post",
    handler: async (req, res) => {
        const { email, feedback } = req.body;

        try {
            const emailText = `
            Email: "${email}".
            Feedback: ${feedback},
            `;
            await sendEmail({
                to: FROM_CUSTOMER_SERVICE,
                from: FROM_CUSTOMER_SERVICE,
                subject: `Feedback from ${email}`,
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
