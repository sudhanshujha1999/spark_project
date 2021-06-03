import { Users } from "../models";
export const addAuthIdToUser = async ({
    userId,
    authId,
    confirmationCode,
    isConfirmed = false,
}) => {
    await Users.findByIdAndUpdate(userId, {
        $set: {
            auth_id: authId,
            confirmationCode,
            isConfirmed,
        },
    });
};
