import * as admin from 'firebase-admin';

export const deleteNote = async noteId => {
    await admin.firestore().collection('notes').doc(noteId).delete();
}