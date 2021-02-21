import * as admin from "firebase-admin";
import { createMembership } from "../memberships";

export const createTeam = async ({ name, game, schoolId, coachId, url }) => {
   const teamRef = await admin
      .firestore()
      .collection("groups")
      .add({ name, game, groupType: "team", url });
   const teamId = teamRef.id;
   await createMembership({
      userId: coachId,
      groupId: teamId,
      membershipTypeId: "coach",
      invitedById: coachId,
   });
   await createMembership({
      userId: teamId,
      groupId: schoolId,
      membershipTypeId: "subgroup",
      invitedById: coachId,
   });
   return teamId;
};
