// MONGO_DB MIGTATION
import { Users } from "../models";

export const getUserByEmail = async (email) => {
    const user = await Users.findOne({ email: email });

    if (!user) return null;

    return user;
};
