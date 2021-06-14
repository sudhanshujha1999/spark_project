import { WarRoom } from "../models";

export const saveStagesOfWarRoom = async ({ sessionId, newStages }) => {
    const updated = await WarRoom.findByIdAndUpdate(
        sessionId,
        { stages: newStages },
        { new: true }
    );
    if (!updated) {
        throw new Error("no-session-found");
    }
    return true;
};
