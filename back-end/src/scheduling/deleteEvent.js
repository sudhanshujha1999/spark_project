import { Events } from "../models";

export const deleteEvent = async ({ eventId, userId }) => {
    const event = await Events.findById(eventId);

    if (!event) {
        // check if there is event
        throw new Error("event-not-found");
    }
    if (event.created_by != userId) {
        // check permissionss
        throw new Error("not-authorized");
    }
    await event.deleteOne();
};
