import { Scrimmage } from "../models";
import { getGroupById } from "../groups";

export const addRequest = async ({
    contact,
    note,
    scrimmageId,
    organizationId,
    skillLevel,
    requestedBy,
    name,
}) => {
    const organizationInfo = await getGroupById(organizationId);
    if (!organizationInfo) {
        throw new Error("no-organization-found");
    }
    const reqObject = {
        organizationId: organizationInfo._id,
        organization_name: organizationInfo.name,
        organization_logo: organizationInfo.image_url,
        coachId: requestedBy,
        coach_name: name,
        coach_contact: contact,
        note: note,
        skill_level: skillLevel,
    };
    const newScrimmage = await Scrimmage.findByIdAndUpdate(
        scrimmageId,
        { $push: { requests: reqObject } },
        { new: true }
    );
    return newScrimmage._id;
};
