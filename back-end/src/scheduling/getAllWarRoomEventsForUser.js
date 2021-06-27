import { Events, WAR_ROOM } from "../models";

export const getAllWarRoomEventsForUser = async (userId) => {
    const allEvents = await Events.find({
        event_type: WAR_ROOM,
        "invitees.id": userId,
    })
        .lean()
        .populate("war_room_session_id");
    // renaming the war_room_sessions_id
    const sessions = allEvents.map(({ war_room_session_id, ...rest }) => {
        return {
            ...rest,
            session: war_room_session_id,
        };
    });

    return sessions;
};
