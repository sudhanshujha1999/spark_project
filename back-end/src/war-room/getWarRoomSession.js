import { Events } from "../models";

export const getWarRoomSession = async ({ sessionId, userId }) => {
    const session = await Events.findOne({ war_room_session_id: sessionId, "invitees.id": userId })
        .lean()
        .populate("war_room_session_id");
    const { war_room_session_id, ...rest } = session;
    return { ...rest, session: war_room_session_id };
};
