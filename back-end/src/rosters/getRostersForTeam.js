import { Groups, ROSTER } from "../models";

export const getRostersForTeam = async (teamId) => {
    if (!teamId) {
        throw new Error("no-team-id");
    }
    const roster = await Groups.find({
        parent_groups: teamId,
        group_type: ROSTER,
    }).select("-parent_groups");
    return roster;
};
