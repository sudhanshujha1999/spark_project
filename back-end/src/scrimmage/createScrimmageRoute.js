import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "../users";
import { createScrimmage } from "./createScrimmage";

export const createScrimmageRoute = {
    path: "/scrimmage/",
    method: "post",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        const authUser = req.user;
        try {
            const user = await getUserByAuthId(authUser.user_id);
            const createdBy = user._id;
            // ----
            // Check permission
            // ----
            const { game, startDate, skillLevel, organizationId, teams } = req.body;
            const scrimmageId = await createScrimmage({
                game,
                date: startDate,
                organizationId,
                teams,
                createdBy,
                skillLevel,
            });
            return res.status(200).json({
                success: true,
                scrimmageId,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
};
