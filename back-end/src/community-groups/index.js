import { addAGroupRoute } from "./addAGroupRoute";
import { joinGroupRoute } from "./joinGroupRoute";
import { getGroupsRoute } from "./getGroupsRoute";
import { getGroupDetailRoute } from "./getGroupDetailRoute";
import { addBulletinRoute } from "./addBulletinRoute";

export const routes = [
    getGroupsRoute,
    getGroupDetailRoute,
    addAGroupRoute,
    joinGroupRoute,
    addBulletinRoute,
];

export { addGroupActivity } from "./addGroupActivity";
