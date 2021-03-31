import { sendEmail, FROM_CUSTOMER_SERVICE } from '../emails';
import { getById } from '../util';

export const sendInvitationEmail = async ({
    email,
    groupName,
    schoolName,
    confirmationCode,
    baseUrl,
}) => {
    const confirmationUrl = `${baseUrl}/invitations/confirm?code=${confirmationCode}`;
    const subject = `Invitation to join ${groupName} at ${schoolName}`;
    const emailText = `
        Hi,

        You've been invited to join "${groupName}".
        Click here to accept this invitation: ${confirmationUrl}

        Thanks!

        Spark Esports
    `;

    return await sendEmail({
        to: email,
        from: FROM_CUSTOMER_SERVICE,
        subject,
        body: emailText,
    });
}