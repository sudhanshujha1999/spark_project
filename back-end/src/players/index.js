import { addNoteToPlayerRoute } from './addNoteToPlayerRoute';
import { addPlayerRoute } from './addPlayerRoute';
import { deleteNoteForPlayerRoute } from './deleteNoteForPlayerRoute';
import { getNotesForPlayerRoute } from './getNotesForPlayerRoute';
import { getPlayersForTeamRoute } from './getPlayersForTeamRoute';

export const routes = [
    addNoteToPlayerRoute,
    addPlayerRoute,
    deleteNoteForPlayerRoute,
    getNotesForPlayerRoute,
    getPlayersForTeamRoute,
];

export { getPlayer } from './getPlayer';
export { getPlayersForRoster } from './getPlayersForRoster';
export { updatePlayer } from './updatePlayer';