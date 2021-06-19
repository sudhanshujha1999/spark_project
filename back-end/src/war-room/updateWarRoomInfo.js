import { WarRoom } from "../models";

export const updateWarRoomInfo = async ({ sessionId, updateValues }) => {
    const updated = await WarRoom.findByIdAndUpdate(
        sessionId,
        { $set: updateValues },
        { new: true }
    );
    if (!updated) {
        throw new Error("no-session-found");
    }
    return true;
};
