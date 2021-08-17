// MONGO_DB MIGTATION
import { Users } from "../models";
export const createUserInDB = async ({ auth_id, email, confirmationCode, isConfirmed = false }) => {
    const newUser = new Users({
        auth_id,
        email,
        confirmationCode,
        isConfirmed,
        isOnboarded: false,
    });
    await newUser.save();
    return newUser._id;
};
