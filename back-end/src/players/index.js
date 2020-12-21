import { addPlayerRoute } from './addPlayerRoute';
import { getPlayersForTeamRoute } from './getPlayersForTeamRoute';

export const routes = [
    addPlayerRoute,
    getPlayersForTeamRoute,
];

export { getPlayer } from './getPlayer';
export { getPlayersForRoster } from './getPlayersForRoster';
export { updatePlayer } from './updatePlayer';