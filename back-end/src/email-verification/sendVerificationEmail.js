import axios from 'axios';
import mailgunBase from 'mailgun-js';
import { sendEmail } from '../emails';
import { toFormData } from '../util';

export const sendVerificationEmail = async ({ email, confirmationCode, baseVerificationUrl }) => {
    return await sendEmail({
        from: 'Taylor <tc@sparkesports.gg>',
        to: email,
        subject: 'Email confirmation',
        body: `Thanks for signing up. Please confirm your email by clicking here: ${baseVerificationUrl}/verify?code=${confirmationCode}`,
    });
}