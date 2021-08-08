import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "../users";
import { addStatsInformation } from "./addStatsInformation";
import { hasPermission } from "../permissions";
import { ADMIN } from "../permissions/permissionTypes";

export const addStatInformationRoute = {
    path: "/stats-form/",
    method: "post",
    // protectors:  [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        try {
            const authUser = req.user;
            const user = await getUserByAuthId(authUser.user_id);
            const createdBy = user._id;
            const { name, teamId, gameName, interval, fields, players, time } = req.body;

            const permissionExist = await hasPermission({
                userId: createdBy,
                groupId: teamId,
                permissionType: ADMIN,
            });
            if (!permissionExist) {
                return res.status(403).json({
                    success: false,
                    message: "not-authorized",
                });
            }
            const statsRecordId = await addStatsInformation({
                name,
                teamId,
                game: gameName,
                createdBy,
                interval,
                time,
                players,
                fields,
                // ifwant to create for a team
                // forTeam:
            });
            return res.status(200).json({
                success: true,
                statsRecordId,
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
