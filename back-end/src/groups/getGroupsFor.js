import * as admin from "firebase-admin";

/*
    This function will return all the groups that
    a given user or group is a member of - only
    one level up, though.
*/
export const getGroupsFor = async (memberId) => {
    // Get all the direct memberships for the memberId
    const membershipsSnapshot = await admin
        .firestore()
        .collection("memberships")
        .where("memberId", "==", memberId)
        .get();
    const memberships = membershipsSnapshot.docs.map((doc) => doc.data());

    // Now that we have the memberships, we need to get the groupId
    // from each membership
    const groupIds = memberships.map((membership) => membership.groupId);

    // Load the corresponding group for each groupId
    const groups = await Promise.all(
        groupIds.map((id) => admin.firestore().collection("groups").doc(id).get())
    );

    return groups;
};
