import { sendEmail, FROM_CUSTOMER_SERVICE } from "../emails";

export const requestInviteRoute = {
    path: "/request-invite",
    method: "post",
    handler: async (req, res) => {
        const { email, organisation, type, level, refer } = req.body;
        const text = `Email : ${email} has request the invite.
                    Organization : ${organisation}
                    User: ${type}
                    Organization Level: ${level}
                    Refered From : ${refer}
        `;
        const subject = "Requested Invite";
        try {
            await sendEmail({
                to: FROM_CUSTOMER_SERVICE,
                from: FROM_CUSTOMER_SERVICE,
                subject,
                body: text,
            });
        } catch (e) {
            console.log(e);
            res.status(404).json("Failed to send invite");
        }
    },
};
