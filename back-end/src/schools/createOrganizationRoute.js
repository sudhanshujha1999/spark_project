import { createOrganization } from "../groups/createOrganization";
import {
    isLoggedInProtector,
    isVerifiedProtector,
    isOnboardedProtector,
} from "../route-protectors";
import { getUserByAuthId } from "../users";

export const createOrganizationRoute = {
    path: "/organization",
    method: "post",
    protectors: [isLoggedInProtector, isVerifiedProtector, isOnboardedProtector],
    handler: async (req, res) => {
		const { orgName, orgType, city, state, zipCode, image_url } = req.body;
        const { user_id: userId } = req.user;
        try {
            if (orgName === "" || orgType === "") {
                return res.status(401).json({ message: "fileds-not-filled" });
            }
            const user = await getUserByAuthId(userId);
            if (!user) {
                return res.status(404).json({ message: "no-user-found" });
            }
            const groupId = await createOrganization({
                name: orgName,
                orgType,
				city,
				state,
				zipCode,
                creatorId: user._id,
                image_url,
            });
            const newUser = await user.updateOne(
                { $push: { organizations: groupId } },
                { new: true }
            );
            return res.status(200).json({
                success: true,
                groupId,
                user,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: error.message });
        }
    },
};
