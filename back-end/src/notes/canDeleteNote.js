import * as admin from 'firebase-admin';
import { getNoteById } from './getNoteById';

export const canDeleteNote = async (userId, noteId) => {
    const note = await getNoteById(noteId);
    return note.coachId === userId;
}