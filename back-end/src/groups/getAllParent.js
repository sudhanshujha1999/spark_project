import { Groups, ORGANIZATION, ROSTER, TEAM } from "../models";

export const getAllParents = async (parentsArray = []) => {
    console.log(parentsArray);
    const parents = await Groups.find({
        _id: { $in: parentsArray },
    });
    let organization = {};
    let team = {};
    let roster = {};
    if (parents.length > 0) {
        parents.forEach((parent) => {
            if (parent.group_type === ORGANIZATION) {
                organization = parent;
            }
            if (parent.group_type === TEAM) {
                team = parent;
            }
            if (parent.group_type === ROSTER) {
                roster = parent;
            }
        });
    }
    return {
        organization,
        roster,
        team,
    };
};
