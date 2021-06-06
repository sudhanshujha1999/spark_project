import { Notes } from "../models";

export const addNoteForPlayer = async ({ coachId, playerId, text }) => {
    const newNoteObject = { created_by: coachId, userId: playerId, text };
    const newNote = new Notes(newNoteObject);
    await newNote.save();
    console.log("note-created");
    return newNote;
};
