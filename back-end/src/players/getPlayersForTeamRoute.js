import { getPlayersForTeam } from './getPlayersForTeam';

export const getPlayersForTeamRoute = {
    path: '/teams/:teamId/players',
    method: 'get',
    handler: async (req, res) => {
        const { teamId } = req.params;

        try {
            const players = await getPlayersForTeam(teamId);
            res.status(200).json(players);
        } catch (e) {
            res.sendStatus(500);
        }
    },
}