import { sendEmail, FROM_CUSTOMER_SERVICE } from '../emails';
import { getById } from '../util';

export const sendEventEmail = async ({
    email,
    eventDetails,
    eventCreatorName,
    eventCreatorEmail,
}) => {
    const { name, description, date, time } = eventDetails;
    const subject = `New Event Invitation: ${name}`;
    const emailText = `
        Hi,

        ${eventCreatorName ? `${eventCreatorName} (${eventCreatorEmail})` : eventCreatorEmail} has invited you to an event:

        ${name} - ${date.toLocaleDateString()} @ ${time}
        ${description}

        Thanks!

        Spark Esports
    `;

    return await sendEmail({
        to: email,
        from: 'Spark Esports <noreply@sparkesports.gg>',
        subject,
        body: emailText,
    });
}