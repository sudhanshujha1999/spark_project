import { isCoachForPlayer } from '../coaches';
import { addNoteForPlayer } from '../notes';
import {
    isLoggedInProtector,
    isVerifiedProtector,
    isOnboardedProtector,
} from '../route-protectors';

export const addNoteToPlayerRoute = {
    method: 'post',
    path: '/players/:playerId/notes',
    protectors: [
        isLoggedInProtector,
        isVerifiedProtector,
    ],
    handler: async (req, res) => {
        const { user_id: coachId } = req.user;
        const { text } = req.body;
        const { playerId } = req.params;

        if (!isCoachForPlayer(coachId, playerId)) {
            return res.status(403).send({ message: 'Coaches can only add notes for their own players' });
        }

        try {
            const newNote = await addNoteForPlayer({ coachId, playerId, text });
            res.status(200).json(newNote);
        } catch (e) {
            console.log(e);
            res.status(500).send({ message: 'Error adding note to user', error: e });
        }
    },
};