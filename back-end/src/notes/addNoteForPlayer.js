import * as admin from 'firebase-admin';

export const addNoteForPlayer = async ({ coachId, playerId, text }) => {
    const createdAt = admin.firestore.Timestamp.fromDate(new Date());
    const newNote = { coachId, playerId, text, createdAt };
    const newNoteRef = await admin.firestore().collection('notes').add(newNote);
    return {
        ...newNote,
        createdAt,
        id: newNoteRef.id,
    };
}