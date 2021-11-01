import { addBulletin } from "./addBulletin";
import { getUserByAuthId } from "../users/getUserByAuthId";
import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";

export const addBulletinRoute = {
    method: "post",
    path: "/:groupId/bulletin/",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        try {
            const authUser = req.user;
            const user = await getUserByAuthId(authUser.user_id);
            const { groupId } = req.params;
            const { bulletinValue } = req.body;
            const check = await addBulletin({
                groupId,
                userId: user._id,
                user: authUser,
                bulletinValue,
            });
            return res.status(200).json({
                success: true,
                check,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(403).json({
                success: false,
                message: `Server error`,
            });
        }
    },
};
