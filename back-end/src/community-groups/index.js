import { addAGroupRoute } from "./addAGroupRoute";
import { joinGroupRoute } from "./joinGroupRoute";
import { getGroupsRoute } from "./getGroupsRoute";
import { getGroupDetailRoute } from "./getGroupDetailRoute";
import { addBulletinRoute } from "./addBulletinRoute";
import { createTournamentRoute } from "./createTournamentRoute";
import { getTournamentForGroupRoute } from "./getTournamentForGroupRoute";
import { getTournamentDetailsRoute } from "./getTournamentDetailsRoute";

export const routes = [
    getGroupsRoute,
    getGroupDetailRoute,
    addAGroupRoute,
    joinGroupRoute,
    addBulletinRoute,
    getTournamentForGroupRoute,
    getTournamentDetailsRoute,
    createTournamentRoute,
];

export { addGroupActivity } from "./addGroupActivity";
