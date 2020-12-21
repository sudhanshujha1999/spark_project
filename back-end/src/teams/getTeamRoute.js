import { getCoachesForGroup } from '../coaches';
import { getRostersForTeam } from '../rosters';
import { getById } from '../util';

export const getTeamRoute = {
    path: '/teams/:teamId',
    method: 'get',
    handler: async (req, res) => {
        const { teamId } = req.params;
        const team = await getById('teams', teamId);

        if (!team) {
            return res.sendStatus(404);
        }

        const rosters = await getRostersForTeam(teamId);
        const coaches = await getCoachesForGroup(teamId);

        return res.status(200).json({
            ...team,
            coaches,
            rosters,
        });
    },
}