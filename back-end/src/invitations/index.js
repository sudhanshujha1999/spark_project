import { acceptInvitationRoute } from "./acceptInvitationRoute";
import { createInvitationRoute } from "./createInvitationRoute";
import { sendFeedbackRoute } from "./sendFeedbackRoute";
import { sendReferRoute } from "./sendReferRoute";

export const routes = [
    acceptInvitationRoute,
    createInvitationRoute,
    sendFeedbackRoute,
    sendReferRoute,
];

export { createInvitation } from "./createInvitation";
export { getInvitationsForRoster } from "./getInvitationsForRoster";
export { sendInvitationEmail } from "./sendInvitationEmail";
