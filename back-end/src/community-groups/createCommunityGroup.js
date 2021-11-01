import { CommunityGroups, GROUP_CREATED } from "../models";
import { getOrganizationCreatedBy } from "../groups/getGroupCreatedBy";
import { v4 as uuidv4 } from "uuid";
import { addGroupActivity } from "./addGroupActivity";

export const createCommunityGroup = async ({
    name,
    state,
    description,
    creatorId,
    organizationId,
}) => {
    const group = await getOrganizationCreatedBy(creatorId, organizationId);
    if (!group) {
        throw new Error("no-org-found");
    }
    // check group memberships not more than 4
    const admins = [creatorId];
    const member_organizations = [
        {
            name: group.name,
            id: group._id,
            location: getLocationFromGroup(group),
        },
    ];
    const newCommunityGroup = {
        name,
        description,
        state,
        admins,
        created_by: creatorId,
        member_organizations,
        group_code: uuidv4().split("-")[0].toUpperCase(),
    };
    const newGroup = new CommunityGroups(newCommunityGroup);
    await newGroup.save();
    const activityName = GROUP_CREATED;
    const activityValue = `Group created`;
    await addGroupActivity({ communityGroupId: newGroup._id, activityName, activityValue });
    return newGroup._id;
};

const getLocationFromGroup = ({ city, state, zipCode }) => {
    return `${city ? city : ""},${state ? state : ""},${zipCode ? zipCode : ""}`;
};
