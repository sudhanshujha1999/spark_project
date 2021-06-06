import { Notes } from "../models";

export const deleteNote = async (noteId) => {
    if (!noteId) {
        throw new Error("no-note-id-found");
    }
    await Notes.findByIdAndDelete(noteId);
    return true;
};
