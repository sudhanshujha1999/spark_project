import { Events, WarRoom } from "../models";
import { WAR_ROOM } from "../models/validEventTypes";

export const deleteEvent = async ({ eventId, userId }) => {
    const event = await Events.findById(eventId);
    // need to check which type of event is it
    // like war -room then delete the whole thing
    if (!event) {
        // check if there is event
        throw new Error("event-not-found");
    }
    if (event.created_by != userId) {
        // check permissionss
        throw new Error("not-authorized");
    }
    if (event.event_type === WAR_ROOM) {
        if (event.war_room_session_id) {
            await WarRoom.findByIdAndDelete(event.war_room_session_id);
        } else {
            console.log("no-war_room_session_id");
        }
    }

    await event.deleteOne();
};
