import * as admin from "firebase-admin";

export const updateTeam = async ({ teamId, name, url, game }) => {
    await admin.firestore().collection("groups").doc(teamId).update({
        name: name,
        url: url,
        game: game,
    });
};
