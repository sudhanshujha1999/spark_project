import * as admin from "firebase-admin";
const bucketName = "gs://spark-esport.appspot.com/";

export const deleteTeamImage = async (url) => {
    // GET THE IMAGE NAME
    const fileName = decodeURIComponent(url.split("/").pop().split("?")[0]);
    console.log(fileName);
    if (fileName.split("/")[0] === "default") {
        return true;
    } else {
        const deletedImage = await admin.storage().bucket(bucketName).file(fileName).delete();
        return deletedImage;
    }
};
