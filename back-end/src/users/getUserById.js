// MONGO_DB MIGTATION
import { Users } from "../models";

export const getUserById = async (id) => {
    const user = await Users.findById(id);

    if (!user) return null;

    return user;
};
