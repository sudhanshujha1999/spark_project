import { Notes } from "../models";
export const getNoteById = async (noteId) => {
    if (!noteId) {
        throw new Error("no-note-id-found");
    }
    const note = await Notes.findById(nodeId);
    return note;
};
