import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "../users";
import { createCommunityGroup } from "./createCommunityGroup";

export const addAGroupRoute = {
    method: "post",
    path: "/community-group/",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        const { name, state, description } = req.body;
        const authUser = req.user;
        try {
            const user = await getUserByAuthId(authUser.user_id);
            const groupId = await createCommunityGroup({
                name,
                state,
                description,
                creatorId: user._id,
            });
            return res.status(200).json({
                success: true,
                groupId: groupId,
            });
        } catch (error) {
            console.log(error.message);
            if (error.message === "no-org-found") {
                return res.status(403).json({
                    success: false,
                    message: `You do not own a organization`,
                });
            }
            return res.status(403).json({
                success: false,
                message: `Server error`,
            });
        }
    },
};
