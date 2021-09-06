import { League } from "../models";
import { hasPermission, ADMIN } from "../permissions";

export const deleteLeague = async (leagueId, userId) => {
    const league = await League.findById(leagueId);
    const groupId = league.groupId;
    const canDeleteLeague = await hasPermission({ userId, groupId, permissionType: ADMIN });
    if (league.created_by != userId) {
        if (!canDeleteLeague) {
            throw new Error("not-authorized");
        }
    }
    await league.deleteOne();
};
