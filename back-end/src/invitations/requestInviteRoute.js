import { sendEmail, FROM_TAYLOR } from "../emails";

export const requestInviteRoute = {
    path: "/request-invite",
    method: "post",
    handler: async (req, res) => {
        const { email, organisation, type, level, refer } = req.body;
        const text = `Email : ${email} has request the invite.
                    Oraganization : ${organisation}
                    User: ${type}
                    Oraganization Level: ${level}
                    Refered From : ${refer}
        `;
        const subject = "Requested Invite";
        try {
            await sendEmail({
                to: FROM_TAYLOR,
                from: FROM_TAYLOR,
                subject,
                body: text,
            });
        } catch (e) {
            console.log(e);
            res.status(404).json("Failed to send invite");
        }
    },
};
