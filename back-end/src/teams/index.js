import { createTeamRoute } from "./createTeamRoute";
import { deleteTeamRoute } from "./deleteTeamRoute";
import { getTeamRoute } from "./getTeamRoute";
import { getTeamsForUserRoute } from "./getTeamsForUserRoute";
import { editTeamRoute } from "./editTeamRoute";

export const routes = [
   createTeamRoute,
   deleteTeamRoute,
   getTeamRoute,
   getTeamsForUserRoute,
   editTeamRoute,
];

export { createTeam } from "./createTeam";
export { getTeamForGroup } from "./getTeamForGroup";
