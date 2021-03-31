import sgMail from '@sendgrid/mail';
import { toFormData } from "../util";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = ({ to, from, subject, body }) => {
    const emailConfig = { from, to, subject, text: body };
    return sgMail.send(emailConfig);
};
