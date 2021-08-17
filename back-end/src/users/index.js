import { createUserRoute } from "./createUserRoute";
import { getSchoolsForUserRoute } from "./getSchoolsForUserRoute";
import { getUserRoute } from "./getUserRoute";
import { getUserInfoRoute } from "./getUserInfoRoute";
import { updateUserRoute } from "./updateUserRoute";

export const routes = [
    createUserRoute,
    getSchoolsForUserRoute,
    getUserRoute,
    getUserInfoRoute,
    updateUserRoute,
];

export { createUserInAuth } from "./createUserInAuth";
export { createUserInDB } from "./createUserInDB";
export { createUserCustomToken } from "./createUserCustomToken";
export { updateDiscordInfo } from "./updateDiscordInfo";
export { getUserByEmail } from "./getUserByEmail";
export { getUserById } from "./getUserById";
export { getUserByAuthId } from "./getUserByAuthId";
export { setUserToOnboarded } from "./setUserToOnboarded";
export { updateUser } from "./updateUser";
export { addOrganizationToPlayer } from "./addOrganizationToPlayer";
