import { getNotesForPlayer, getAllNotesForPlayer } from "../notes";
import { ADMIN, hasPermission } from "../permissions";
import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "../users";

export const getNotesForPlayerRoute = {
    method: "get",
    path: "/players/:playerId/teams/:teamId/notes",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        const requesterAuthId = req.user.uid;
        const requesterUser = await getUserByAuthId(requesterAuthId);
        const requesterId = requesterUser.id;
        const { teamId: groupId } = req.params;
        const { playerId } = req.params;
        try {
            if (playerId !== requesterId) {
                console.log("not-player");
                console.log("check-permission");
                const isAllowed = await hasPermission({
                    userId: requesterId,
                    groupId,
                    permissionType: ADMIN,
                });
                if (!isAllowed)
                    return res.send(403).json({
                        nodes: [],
                    });
            }
            const coachId = requesterId;

            let notes;
            // check who is requesting for notes if player
            // return all notes
            if (playerId === requesterId) {
                console.log("show-player-all-his-notes");
                notes = (await getAllNotesForPlayer({ playerId }))
                    .slice()
                    .sort((a, b) => b.createdAt - a.createdAt);
            } else {
                // if some other person than only the notes they have added
                // PERMISSIONS: Players should only be able to see their own notes
                notes = (await getNotesForPlayer({ coachId, playerId })).sort(
                    (a, b) => b.createdAt - a.createdAt
                );
            }

            return res.status(200).json(notes);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "server-error",
            });
        }
    },
};
