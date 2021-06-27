import { DISCUSSION } from "../models/validEventTypes";
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
        try {
            const user = await getUserByAuthId(authUser.user_id);
            const createdById = user._id;
            const eventId = await createEvent({
                name,
                time,
                date,
                // later take it from the body
                event_type: DISCUSSION,
                description,
                background_color: backgroundColor,
                created_by: createdById,
                invitees: [
                    ...invitees,
                    {
                        id: user._id,
                        email: user.email,
                        name: user.full_name,
                        gamerName: user.gamer_name,
                        profile_img: user.profile_img,
                        bio: user.bio,
                    },
                ],
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

            return res.status(200).json({
                eventId: eventId,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({
                message: error.message,
            });
        }
    },
};
