import { getTournamentForCommunityGroup } from "./getTournamentForCommunityGroup";

export const getTournamentForGroupRoute = {
    method: "get",
    path: "/:groupId/tournament",
    handler: async (req, res) => {
        const authUser = req.user;
        try {
            const { groupId } = req.params;
            const tournaments = await getTournamentForCommunityGroup({ groupId });
            return res.status(200).json({
                success: true,
                tournaments: tournaments,
            });
        } catch (error) {
            console.log(error.message);
            if (error.message === "no-groupId") {
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
