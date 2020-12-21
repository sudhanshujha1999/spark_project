import mailgunBase from 'mailgun-js';
import { toFormData } from '../util';

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = 'mail.sparkesports.gg';
const mailgun = mailgunBase({ apiKey: MAILGUN_API_KEY, domain: DOMAIN });

export const sendEmail = ({ to, from, subject, body }) => {
    const emailConfig = { from, to, subject, text: body };

    return new Promise((resolve, reject) => {
        mailgun.messages().send(emailConfig, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        }); 
    })
}