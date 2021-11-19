import { addAGroupRoute } from "./addAGroupRoute";
import { joinGroupRoute } from "./joinGroupRoute";
import { getGroupsRoute } from "./getGroupsRoute";
import { getGroupDetailRoute } from "./getGroupDetailRoute";
import { addBulletinRoute } from "./addBulletinRoute";
import { createTournamentRoute } from "./createTournamentRoute";
import { getTournamentForGroupRoute } from "./getTournamentForGroupRoute";

export const routes = [
    getGroupsRoute,
    getGroupDetailRoute,
    addAGroupRoute,
    joinGroupRoute,
    addBulletinRoute,
    getTournamentForGroupRoute,
    createTournamentRoute,
];

export { addGroupActivity } from "./addGroupActivity";
