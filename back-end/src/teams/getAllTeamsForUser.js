import * as admin from "firebase-admin";
import { getCoachesForGroup } from "../coaches";
import { getSchoolForGroup } from "../schools";
import { getTeamForGroup } from "./getTeamForGroup";

const removeDuplicatesByProperty = (property, objects) => {
   const differentValues = [...new Set(objects.map((obj) => obj[property]))];
   return differentValues.map((val) =>
      objects.find((obj) => obj[property] === val)
   );
};

export const getAllTeamsForUser = async (userId) => {
   const coachMembershipsQuerySnapshot = await admin
      .firestore()
      .collection("memberships")
      .where("membershipTypeId", "==", "coach")
      .where("userId", "==", userId)
      .limit(20)
      .get();
   const playerMembershipsQuerySnapshot = await admin
      .firestore()
      .collection("memberships")
      .where("membershipTypeId", "==", "player")
      .where("userId", "==", userId)
      .limit(10)
      .get();

   const coachMemberships = coachMembershipsQuerySnapshot.docs.map((doc) =>
      doc.data()
   );
   const playerMemberships = playerMembershipsQuerySnapshot.docs.map((doc) =>
      doc.data()
   );

   const memberships = [...coachMemberships, ...playerMemberships];
   const groupDocSnapshots = await Promise.all(
      memberships.map((membership) =>
         admin.firestore().collection("groups").doc(membership.groupId).get()
      )
   );
   const teams = (
      await Promise.all(
         groupDocSnapshots.map((groupDoc) =>
            getTeamForGroup({ ...groupDoc.data(), id: groupDoc.id })
         )
      )
   ).filter((x) => x);
   const teamsNoDupes = removeDuplicatesByProperty("id", teams);
   const schools = await Promise.all(
      teamsNoDupes.map((team) => getSchoolForGroup(team))
   );
   const teamsWithSchools = teamsNoDupes.map((team, i) => ({
      ...team,
      school: schools[i],
   }));

   return teamsWithSchools;
};
