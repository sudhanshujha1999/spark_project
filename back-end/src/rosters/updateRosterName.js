import * as admin from "firebase-admin";

export const updateRosterName = async (rosterId, name) => {
   await admin.firestore().collection("groups").doc(rosterId).update({
      name: name,
   });
};
