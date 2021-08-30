import { CommunityGroups } from "../models";
import { getOrganizationCreatedBy } from "../groups/getGroupCreatedBy";
import { v4 as uuidv4 } from "uuid";

export const createCommunityGroup = async ({ name, state, description, creatorId }) => {
    const group = await getOrganizationCreatedBy(creatorId);
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
    return newGroup._id;
};

const getLocationFromGroup = ({ city, state, zipcode }) => {
    return `${city ? city : ""},${state ? state : ""},${zipcode ? zipcode : ""}`;
};
