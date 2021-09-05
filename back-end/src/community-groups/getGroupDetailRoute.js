import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "../users";
import { getGroupDetails } from "./getGroupDetails";
import { Types } from "mongoose";

export const getGroupDetailRoute = {
    method: "get",
    path: "/:groupId/:organizationId/details/",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        const authUser = req.user;
        const { groupId, organizationId } = req.params;
        try {
            const user = await getUserByAuthId(authUser.user_id);
            if (!user.organizations.includes(Types.ObjectId(organizationId))) {
                throw new Error("no-org-found");
            }
            const group = await getGroupDetails(groupId, organizationId);
            return res.status(200).json({
                success: true,
                group,
            });
        } catch (error) {
            console.log(error.message);
            if (error.message === "no-org-found") {
                return res.status(403).json({
                    success: false,
                    message: `You are not part of that group`,
                });
            }
            return res.status(403).json({
                success: false,
                message: `Server error`,
            });
        }
    },
};
