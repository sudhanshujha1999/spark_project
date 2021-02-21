import { createTeamRoute } from "./createTeamRoute";
import { deleteTeamRoute } from "./deleteTeamRoute";
import { getTeamRoute } from "./getTeamRoute";
import { getTeamsForUserRoute } from "./getTeamsForUserRoute";
import { editTeamRoute } from "./editTeamRoute";
import { testRoute } from "./testRoute";
export const routes = [
   createTeamRoute,
   deleteTeamRoute,
   getTeamRoute,
   getTeamsForUserRoute,
   editTeamRoute,
   testRoute,
];

export { createTeam } from "./createTeam";
export { getTeamForGroup } from "./getTeamForGroup";
