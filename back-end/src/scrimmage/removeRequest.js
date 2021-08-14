import { Scrimmage } from "../models";

export const removeRequest = async ({ scrimmageId, organizationId }) => {
    const updatedScrimmage = await Scrimmage.findByIdAndUpdate(
        scrimmageId,
        {
            $pull: { requests: { organizationId: organizationId } },
        },
        { new: true }
    );
    return updatedScrimmage._id;
};
