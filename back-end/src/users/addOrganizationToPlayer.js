import { Users } from "../models";
export const addOrganizationToPlayer = async (userId, orgnaizationId) => {
    await Users.findByIdAndUpdate(
        userId,
        { $push: { organizations: orgnaizationId } },
        { new: true }
    );
};
