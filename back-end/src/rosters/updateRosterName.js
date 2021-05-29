import { Groups } from "../models";
export const updateRosterName = async (rosterId, name) => {
    await Groups.findByIdAndUpdate(rosterId, { name: name });
};
