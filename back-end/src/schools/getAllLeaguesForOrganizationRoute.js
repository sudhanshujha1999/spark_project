import { getLeaguesForOrganizations } from "./getLeaguesForOrganization";

export const getAllLeaguesForOrganizationRoute = {
    path: "/:groupId/league",
    method: "get",
    handler: async (req, res) => {
        const { groupId } = req.params;
        try {
            const leagues = await getLeaguesForOrganizations(groupId);
            return res.status(200).json({
                leagues,
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
