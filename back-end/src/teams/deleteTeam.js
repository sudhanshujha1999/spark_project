import { Groups } from "../models";
import { deleteTeamImage } from "./deleteTeamImage";

export const deleteTeam = async (teamId, userId) => {
    // do we want to make a check if the team is delted by the creator
    console.log("delete ID:" + teamId);
    const authrizedToDelete = await Groups.findOne({ _id: teamId, created_by: userId });
    if (!authrizedToDelete) {
        throw new Error("not-authorized-to-delete");
    }
    if (authrizedToDelete.image_url) {
        await deleteTeamImage(authrizedToDelete.image_url);
    }

    await Groups.deleteMany({ parent_groups: teamId });
    return true;
    // const team = admin.firestore().collection("groups").doc(teamId);
    // // GET TEAMS DATA WITH TO GET URL
    // const data = (await team.get()).data();
    // // IF URL EXIST CALL DELETE-IMAGE
    // if (data.url) {
    //     await deleteTeamImage(data.url);
    // }
    // // DELETE-TEAM
    // await team.delete();

    // const membershipsSnapshot = await admin
    //     .firestore()
    //     .collection("memberships")
    //     .where("groupId", "==", teamId)
    //     .get();
    // const invitationsSnapshot = await admin
    //     .firestore()
    //     .collection("invitations")
    //     .where("groupId", "==", teamId)
    //     .get();

    // var batch = admin.firestore().batch();

    // membershipsSnapshot.forEach((doc) => {
    //     batch.delete(doc.ref);
    // });

    // invitationsSnapshot.forEach((doc) => {
    //     batch.delete(doc.ref);
    // });

    // await batch.commit();
};
