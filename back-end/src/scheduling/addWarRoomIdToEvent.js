import { Events } from "../models";

export const addWarRoomIdToEvent = async ({ eventId, warRoomId }) => {
    await Events.findByIdAndUpdate(eventId, { war_room_session_id: warRoomId });
};
