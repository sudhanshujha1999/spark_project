import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "./getUserByAuthId";
import { getUserById } from "./getUserById";

export const getUserRoute = {
    path: "/users/:authId",
    method: "get",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        const authUser = req.user;
        const { authId } = req.params;
        if (authId === authUser.user_id) {
            const authUserInfo = await getUserByAuthId(authUser.user_id);
            return res.status(200).json(authUserInfo);
        }

        return res.status(403).json({ message: "Users can only view their own data" });
    },
};
