import { createTeamRoute } from './createTeamRoute';
import { deleteTeamRoute } from './deleteTeamRoute';
import { getTeamRoute } from './getTeamRoute';
import { getTeamsForUserRoute } from './getTeamsForUserRoute';

export const routes = [
    createTeamRoute,
    deleteTeamRoute,
    getTeamRoute,
    getTeamsForUserRoute,
];

export { createTeam } from './createTeam';
export { getTeamForGroup } from './getTeamForGroup';