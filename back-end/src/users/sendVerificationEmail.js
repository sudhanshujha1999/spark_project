import axios from 'axios';
import mailgunBase from 'mailgun-js';
import { toFormData } from '../util';

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = 'mail.sparkesports.gg';
const mailgun = mailgunBase({ apiKey: MAILGUN_API_KEY, domain: DOMAIN });

export const sendVerificationEmail = ({ email, confirmationCode, baseVerificationUrl, callback }) => {
    const emailConfig = {
        from: 'Taylor <taylor@sparkesports.gg>',
        to: email,
        subject: 'Email confirmation',
        text: `Thanks for signing up. Please confirm your email by clicking here: ${baseVerificationUrl}/verify?code=${confirmationCode}`,
    };

    mailgun.messages().send(emailConfig, callback); 
}