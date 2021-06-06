import { Notes } from "../models";

export const getAllNotesForPlayer = async ({ playerId }) => {
    const notes = await Notes.find({
        userId: playerId,
    });
    return notes;
};
