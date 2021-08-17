import { Invitation } from "../models";

export const createInvitation = async ({
    email,
    coachId,
    teamId,
    organizationId,
    rosterId,
    inTeamAlready,
    inRosterAlready,
    playerHasOrganization,
    confirmationCode,
}) => {
    const newInvitation = new Invitation({
        confirmationCode,
        email,
        invitedBy: coachId,
        inTeamAlready,
        teamId,
        inRosterAlready,
        rosterId,
        playerHasOrganization,
        organizationId,
    });
    await newInvitation.save();
};
