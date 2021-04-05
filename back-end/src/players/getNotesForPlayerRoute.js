import { getNotesForPlayer } from '../notes';
import {
    isLoggedInProtector,
    isVerifiedProtector,
} from '../route-protectors';

export const getNotesForPlayerRoute = {
    method: 'get',
    path: '/players/:playerId/notes',
    protectors: [
        isLoggedInProtector,
        isVerifiedProtector,
    ],
    handler: async (req, res) => {
        const { user_id: coachId } = req.user;
        const { playerId } = req.params;

        // PERMISSIONS: Players should only be able to see their own notes
        const notes = (await getNotesForPlayer({ coachId, playerId }))
            .slice()
            .sort((a, b) => b.createdAt - a.createdAt);

        res.status(200).json(notes);
    },
}