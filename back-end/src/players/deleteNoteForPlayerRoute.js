import { isCoachForPlayer } from '../coaches';
import { canDeleteNote, deleteNote } from '../notes';
import {
    isLoggedInProtector,
    isVerifiedProtector,
} from '../route-protectors';

export const deleteNoteForPlayerRoute = {
    method: 'delete',
    path: '/players/:playerId/notes/:noteId',
    protectors: [
        isLoggedInProtector,
        isVerifiedProtector,
    ],
    handler: async (req, res) => {
        const { user_id: coachId } = req.user;
        const { playerId, noteId } = req.params;

        // PERMISSIONS: Change this
        if (!(await canDeleteNote(coachId, noteId))) {
            return res.status(403).send({ message: 'Coaches can only delete notes for their own players' });
        }

        try {
            await deleteNote(noteId);
            res.sendStatus(200);
        } catch (e) {
            res.status(500).send({ message: 'Error deleting note from user', error: e });
        }
    },
};