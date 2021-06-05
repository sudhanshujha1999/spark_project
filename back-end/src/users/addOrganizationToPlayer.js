import { Users } from "../models";
import { createNewPlayerPermission } from "../permissions";
export const addOrganizationToPlayer = async (userId, orgnaizationId) => {
    await Users.findByIdAndUpdate(
        userId,
        { $push: { organizations: orgnaizationId } },
        { new: true }
    );
    await createNewPlayerPermission({ userId: userId, groupId: orgnaizationId });
};
