import { League } from "../models";

export const deleteLeague = async (leagueId, userId) => {
    const league = await League.findById(leagueId);
    if (league.created_by != userId) {
        throw new Error("not-authorized");
    }
    await league.deleteOne();
};
