import { acceptInvitationRoute } from './acceptInvitationRoute';
import { confirmInvitationRoute } from './confirmInvitationRoute';
import { createInvitationRoute } from './createInvitationRoute';

export const routes = [
    acceptInvitationRoute,
    confirmInvitationRoute,
    createInvitationRoute,
];

export { createInvitation } from './createInvitation';
export { getInvitationsForRoster } from './getInvitationsForRoster';
export { sendInvitationEmail } from './sendInvitationEmail';