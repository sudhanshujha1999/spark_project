import { getUserByAuthId } from '../users';
import { createEvent } from './createEvent';
import { sendEventEmail } from './sendEventEmail';

export const createEventRoute = {
    path: '/events',
    method: 'post',
    handler: async (req, res) => {
        const { name, description, date: dateRaw, time, invitees = [] } = req.body;
        const date = new Date(dateRaw);
        const authUser = req.user;
        const user = await getUserByAuthId(authUser.user_id);
        const createdById = user.id;

        await createEvent({ name, description, date, time, invitees: [...invitees, user.email], createdById });

        for (let invitee of invitees) {
            console.log(invitee);
            sendEventEmail({
                email: invitee,
                eventDetails: {
                    name,
                    description,
                    date,
                    time,
                },
                eventCreatorName: user.fullName,
                eventCreatorEmail: user.email,
            });
        }

        res.sendStatus(200);
    },
}