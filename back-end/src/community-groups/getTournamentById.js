import { Tournament } from "../models";

export const getTournamentById = async ({ tournamentId, userId, user }) => {
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
        throw new Error("no-tournament-found");
    }
    const published = tournament.publishable;
    const createdBy = tournament.created_by_user;
    if (published) {
        return tournament;
    } else {
        if (`${userId}` == `${createdBy}`) {
            return tournament;
        }
        return null;
    }
};
