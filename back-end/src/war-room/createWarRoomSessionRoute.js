import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "../users";
import { WAR_ROOM } from "../models/validEventTypes";
import { createEvent } from "../scheduling";
import { createWarRoomSession } from "./createWarRoomSession";

export const createWarRoomSessionRoute = {
    path: "/war-room",
    method: "post",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        const authUser = req.user;
        const {
            team,
            game,
            opponentTeam,
            eventName,
            eventDate,
            mapName,
            mapLink,
            invitees,
            description,
        } = req.body;

        try {
            if (!team || !game || !eventDate || !eventName) {
                return res
                    .status(400)
                    .json({ success: false, message: "Please fill the required field" });
            }

            // user creating the war room session
            const user = await getUserByAuthId(authUser.user_id);
            const createdById = user._id;
            const eventId = await createEvent({
                name: eventName,
                date: eventDate,
                event_type: WAR_ROOM,
                description,
                created_by: createdById,
                invitees: [
                    ...invitees,
                    {
                        id: user._id,
                        name: user.full_name,
                        email: user.email,
                        gamerName: user.gamer_name,
                        profile_img: user.profile_img,
                        bio: user.bio,
                    },
                ],
            });
            // create a war room session
            const sessionId = await createWarRoomSession({
                sessionName: eventName,
                team,
                game,
                opponentName: opponentTeam,
                mapLink,
                mapName,
                description,
                eventId,
            });
            // everything we  normally
            console.log("war-room-session-created");
            return res.status(200).json({
                success: true,
                sessionId,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
};
