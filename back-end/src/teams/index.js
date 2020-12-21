import { createTeamRoute } from './createTeamRoute';
import { getTeamRoute } from './getTeamRoute';
import { getTeamsForUserRoute } from './getTeamsForUserRoute';

export const routes = [
    createTeamRoute,
    getTeamRoute,
    getTeamsForUserRoute,
];

export { createTeam } from './createTeam';