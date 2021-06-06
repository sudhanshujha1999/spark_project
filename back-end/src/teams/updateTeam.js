import { Groups } from "../models";

export const updateTeam = async ({ teamId, updateValues }) => {
    let query = {};
    for (var key in updateValues) {
        //could also be req.query and req.params
        updateValues[key] !== "" ? (query[key] = updateValues[key]) : null;
    }
    await Groups.findByIdAndUpdate(teamId, { $set: query }, { new: true });
};
