import { Invitation } from "../models";
export const getAllInvitationsForTeam = async (teamId) => {
    const inviations = await Invitation.find({
        teamId: teamId,
        isConfirmed: false,
    }).select("email");
    return inviations;
};
