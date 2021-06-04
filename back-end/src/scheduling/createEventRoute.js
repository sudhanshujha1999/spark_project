import { getUserByAuthId } from "../users";
import { createEvent } from "./createEvent";
import { sendEventEmail } from "./sendEventEmail";

export const createEventRoute = {
    path: "/events",
    method: "post",
    handler: async (req, res) => {
        const { name, description, date: dateRaw, time, invitees = [], backgroundColor } = req.body;
        const date = new Date(dateRaw);
        const authUser = req.user;
        console.log(invitees);
        try {
            const user = await getUserByAuthId(authUser.user_id);
            const createdById = user._id;
            await createEvent({
                name,
                time,
                date,
                description,
                background_color: backgroundColor,
                created_by: createdById,
                invitees: [
                    ...invitees,
                    {
                        id: user._id,
                        email: user.email,
                    },
                ],
                createdById,
            });
            // no invitations we can create task to check if the player exist or not
            // if exists then add him if not then create him in db and send invite
            // for (let invitee of invitees) {
            //     console.log(invitee);
            //     sendEventEmail({
            //         email: invitee,
            //         eventDetails: {
            //             name,
            //             description,
            //             date,
            //             time,
            //         },
            //         eventCreatorName: user.fullName,
            //         eventCreatorEmail: user.email,
            //     });
            // }

            return res.sendStatus(200);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({
                message: error.message,
            });
        }
    },
};
