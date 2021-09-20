import { Groups, TRIAL, ORGANIZATION } from "../models";

export const addGroupTrialDate = async (groupId) => {
    const group = await Groups.findById(groupId);
    if (group.group_type !== ORGANIZATION) {
        throw new Error("not-a-organization");
    }
    let start = new Date(group.createdAt);
    const trialEndDate = new Date(start.setDate(start.getDate() + 30));
    const queryForTrial = {
        subscription_status: TRIAL,
        subscription_endDate: trialEndDate,
    };
    await group.updateOne({ $set: queryForTrial });
    return `${group.name} added trial`;
};
