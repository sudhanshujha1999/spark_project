import { Notes } from "../models";

export const getNotesForPlayer = async ({ viewerId, playerId }) => {
    const notes = Notes.find({
        userId: playerId,
        created_by: viewerId,
    });

    return notes;
};
