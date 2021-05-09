import { isCoachForPlayer } from '../coaches';
import { addNoteForPlayer } from '../notes';
import { ADMIN, hasPermission } from '../permissions';
import {
    isLoggedInProtector,
    isVerifiedProtector,
    isOnboardedProtector,
} from '../route-protectors';
import { getUserByAuthId } from "../users";

export const addNoteToPlayerRoute = {
    method: 'post',
    path: '/players/:playerId/notes',
    protectors: [
        isLoggedInProtector,
        isVerifiedProtector,
    ],
    handler: async (req, res) => {
        const { user_id: coachId } = req.user;
        const { text, groupId } = req.body;
        const { playerId } = req.params;

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
            const newNote = await addNoteForPlayer({ coachId, playerId, text });
            res.status(200).json(newNote);
        } catch (e) {
            console.log(e);
            res.status(500).send({ message: 'Error adding note to user' });
        }
    },
};