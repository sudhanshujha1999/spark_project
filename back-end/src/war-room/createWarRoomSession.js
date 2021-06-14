import { WarRoom } from "../models";
import { addWarRoomIdToEvent } from "../scheduling/addWarRoomIdToEvent";

export const createWarRoomSession = async ({
    sessionName,
    team,
    game,
    opponentName,
    mapLink,
    mapName,
    description,
    eventId,
}) => {
    if (!eventId) {
        throw new Error("no-event-id-found");
    }
    const newWarRoom = new WarRoom({
        session_name: sessionName,
        eventId: eventId,
        team,
        opponent_team: opponentName,
        game,
        map_name: mapName,
        description: description,
        map_link: mapLink,
    });
    await newWarRoom.save();
    const warRoomId = newWarRoom._id;
    await addWarRoomIdToEvent({
        eventId,
        warRoomId,
    });
    return warRoomId;
};
