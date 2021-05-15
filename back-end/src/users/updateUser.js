import { Users } from "../models";
export const updateUser = async (userId, params) => {
    let query = {};
    for (var key in params) {
        //could also be req.query and req.params
        params[key] !== "" ? (query[key] = params[key]) : null;
    }
    const updated = await Users.findByIdAndUpdate(userId, { $set: query });
    return updated;
};
