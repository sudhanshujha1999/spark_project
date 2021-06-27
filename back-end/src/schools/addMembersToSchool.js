import * as admin from "firebase-admin";
import { createMembership } from "../memberships";

export const addMembersToSchool = async (schoolId, coachId, memberIds) => {
    await admin
        .firestore()
        .collection("schools")
        .doc(schoolId)
        .update({
            memberIds: admin.firestore.FieldValue.arrayUnion(...memberIds),
        });

    for (let userId of memberIds) {
        await createMembership({
            userId,
            groupId: schoolId,
            membershipTypeId: "coach",
            invitedById: coachId,
        });
    }

    return schoolId;
};
