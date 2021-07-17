import { createScrimmageRoute } from "./createScrimmageRoute";
import { getAllScrimmageRoute } from "./getAllScrimmageRoute";
import { intresetedInScrimmageRoute } from "./intresetedInScrimmageRoute";
import { removeIntrestRoute } from "./removeIntrestRoute";
import { declineInvitationRoute } from "./declineInvitationRoute";
import { acceptInvitationRoute } from "./acceptInvitationRoute";

export const routes = [
    getAllScrimmageRoute,
    createScrimmageRoute,
    intresetedInScrimmageRoute,
    removeIntrestRoute,
    declineInvitationRoute,
    acceptInvitationRoute,
];

export { getAllScrimmage } from "./getAllScrimmage";
