import { deleteTeam } from './deleteTeam';

export const deleteTeamRoute = {
    path: '/teams/:id',
    method: 'delete',
    handler: async (req, res) => {
        const { id: teamId } = req.params;
        try {
            await deleteTeam(teamId);
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}