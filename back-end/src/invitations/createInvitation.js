// import * as admin from "firebase-admin";

// const membershipTypes = {
//     coach: {},
//     player: {},
// };

// export const createInvitation = async ({
//     email,
//     userId,
//     groupId,
//     membershipTypeId,
//     invitedById,
//     confirmationCode,
// }) => {
//     const createdAt = new Date();
//     const docRef = await admin.firestore().collection("invitations").add({
//         email,
//         userId,
//         groupId,
//         membershipTypeId,
//         invitedById,
//         confirmationCode,
//         data,
//         createdAt,
//     });

//     return docRef.id;
// };

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
