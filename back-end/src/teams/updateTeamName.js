import * as admin from "firebase-admin";

export const updateTeamName = async (teamId, name) => {
   await admin.firestore().collection("groups").doc(teamId).update({
      name: name,
   });
};
