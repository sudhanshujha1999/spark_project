import { createGroup } from '../groups';
import { createMembership } from '../memberships';
import { createRoster } from '../rosters';
import {
    isLoggedInProtector,
    isVerifiedProtector,
    isOnboardedProtector,
} from '../route-protectors';
import { isCoachForSchool } from '../schools';
import { createTeam } from '../teams';
import { getUserByAuthId } from '../users';

export const createTeamRoute = {
    path: '/teams',
    method: 'post',
    protectors: [
        isLoggedInProtector,
        isVerifiedProtector,
    ],
    handler: async (req, res) => {
        const { name, game, schoolId, rosters } = req.body;
        const { user_id: coachAuthId } = req.user;

        const coachUser = await getUserByAuthId(coachAuthId);
        const coachId = coachUser.id;

        const isCoach = await isCoachForSchool(coachId, schoolId);
        if (!isCoach) return res.status(403).json({ message: 'Only coaches can add teams to schools' });

        const teamId = await createTeam({
            name,
            game,
            schoolId,
            coachId,
        });

        for (let roster of rosters) {
            const { name: rosterName = '' } = roster;
            const rosterId = await createRoster({
                name: rosterName,
                teamId,
                coachId,
            });
        }

        res.status(200).send(teamId);
    },
}
