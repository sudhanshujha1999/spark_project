import { getNotesForPlayer } from '../notes';
import { ADMIN, hasPermission } from '../permissions';
import {
    isLoggedInProtector,
    isVerifiedProtector,
} from '../route-protectors';
import { getUserByAuthId } from "../users";

export const getNotesForPlayerRoute = {
    method: 'get',
    path: '/players/:playerId/teams/:teamId/notes',
    protectors: [
        isLoggedInProtector,
        isVerifiedProtector,
    ],
    handler: async (req, res) => {
        const requesterAuthId = req.user.uid;
        const requesterUser = await getUserByAuthId(requesterAuthId);
        const requesterId = requesterUser.id;
        const { teamId: groupId } = req.params;

        const isAllowed = await hasPermission({
            userId: requesterId, 
            groupId,
            permissionType: ADMIN,
        });
        
        if (!isAllowed) return res.sendStatus(403);

        const { user_id: coachId } = req.user;
        const { playerId } = req.params;

        // PERMISSIONS: Players should only be able to see their own notes
        const notes = (await getNotesForPlayer({ coachId, playerId }))
            .slice()
            .sort((a, b) => b.createdAt - a.createdAt);

        res.status(200).json(notes);
    },
}