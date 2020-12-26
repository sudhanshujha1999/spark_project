import * as admin from 'firebase-admin';

export const getNoteById = async (noteId) => {
    const noteDoc = await admin.firestore().collection('notes').doc(noteId).get();
    return {
        ...noteDoc.data(),
        id: noteDoc.id,
    };
}