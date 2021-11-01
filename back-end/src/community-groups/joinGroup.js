import { CommunityGroups, ORGANIZATION_JOINED } from "../models";
import { getGroupById } from "../groups";
import { exceedeGroupsLimit } from "./exceedeGroupsLimit";
import { addGroupActivity } from "./addGroupActivity";

export const joinGroup = async ({ organizationId, groupCode }) => {
    if (!organizationId) {
        throw new Error("no-org-found");
    }
    // check if group exist
    const group = await CommunityGroups.findOne({
        group_code: groupCode,
    });
    if (!group) {
        throw new Error("no-group-found");
    }
    // check if already a part of group
    const ifAlreadyMember = group.member_organizations.some(({ id }) => id == organizationId);
    if (ifAlreadyMember) {
        // already a member
        console.log("already a member");
        return group._id;
    }

    const groupExceededLimit = await exceedeGroupsLimit({ organizationId });
    if (groupExceededLimit) {
        throw new Error("group-limit-exceeded");
    }
    //get the organization
    const organizationDetails = await getGroupById(organizationId);
    const member = {
        name: organizationDetails.name,
        id: organizationDetails._id,
        location: getLocationFromGroup(organizationDetails),
    };
    const activityValue = `${organizationDetails.name} has joined`;
    await addGroupActivity({
        communityGroupId: group._id,
        activityName: ORGANIZATION_JOINED,
        activityValue,
    });
    console.log("added a member");
    await group.updateOne({ $push: { member_organizations: member } });
    return group._id;
};

const getLocationFromGroup = ({ city, state, zipCode }) => {
    return `${city ? city : ""},${state ? state : ""},${zipCode ? zipCode : ""}`;
};
