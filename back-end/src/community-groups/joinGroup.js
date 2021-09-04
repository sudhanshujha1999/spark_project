import { CommunityGroups } from "../models";
import { getGroupById } from "../groups";
import { exceedeGroupsLimit } from "./exceedeGroupsLimit";

export const joinGroup = async ({ organizaitonId, groupCode }) => {
    if (!organizaitonId) {
        throw new Error("no-org-found");
    }
    const groupExceededLimit = await exceedeGroupsLimit({ organizationId });
    if (groupExceededLimit) {
        throw new Error("group-limit-exceeded");
    }
    const group = await CommunityGroups.findOne({
        group_code: groupCode,
    });
    if (!group) {
        throw new Error("no-group-found");
    }
    // check if alread a part of group
    const ifAlreadMember = group.member_organizations.some(({ id }) => id == organizaitonId);
    if (ifAlreadMember) {
        // already a member
        console.log("already a member");
        return group._id;
    }
    const organizationDetails = await getGroupById(organizaitonId);
    const member = {
        name: organizationDetails.name,
        id: organizationDetails._id,
        location: getLocationFromGroup(organizationDetails),
    };
    console.log("added a member");
    await group.updateOne({ $push: { member_organizations: member } });
    return group._id;
};

const getLocationFromGroup = ({ city, state, zipCode }) => {
    return `${city ? city : ""},${state ? state : ""},${zipCode ? zipCode : ""}`;
};
