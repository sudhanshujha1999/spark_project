import { isCoachForPlayer } from '../coaches';
import { canDeleteNote, deleteNote } from '../notes';
import { ADMIN, hasPermission } from '../permissions';
import {
    isLoggedInProtector,
    isVerifiedProtector,
} from '../route-protectors';
import { getUserByAuthId } from "../users";

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
        const { groupId } = req.body;

        // 1. Who's sending this request? (We need to translate their authId to an actual userId)
        const requesterAuthId = req.user.uid;
        const requesterUser = await getUserByAuthId(requesterAuthId);
        const requesterId = requesterUser.id;

        const isAllowed = await hasPermission({
            userId: requesterId, 
            groupId,
            permissionType: ADMIN,
        });

        if (!isAllowed) return res.sendStatus(403);

        try {
            await deleteNote(noteId);
            res.sendStatus(200);
        } catch (e) {
            res.status(500).send({ message: 'Error deleting note from user', error: e });
        }
    },
};