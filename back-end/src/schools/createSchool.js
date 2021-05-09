import * as admin from "firebase-admin";
import { createMembership } from "../memberships";

export const createSchool = async ({ name, coachId, groupType = "school" }) => {
    const schoolRef = await admin.firestore().collection("schools").add({ name, coachId, memberIds: [coachId], groupType });
    const schoolId = schoolRef.id;
    await createMembership({
        userId: coachId,
        groupId: schoolId,
        membershipTypeId: "coach",
        invitedById: coachId,
    });
    return schoolId;
};
