import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getGroupsWithOrganizationId } from "./getGroupsWithOrganizationId";

export const getGroupsRoute = {
    method: "get",
    path: "/:organizationId/community-group/",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        try {
            const { organizationId } = req.params;
            const groups = await getGroupsWithOrganizationId(organizationId);
            return res.status(200).json({
                success: true,
                groups: groups,
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
