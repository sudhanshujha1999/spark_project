import { League } from "../models";

export const addLeague = async ({ team, game, league, userId, groupId }) => {
    const newLeague = new League({
        groupId,
        created_by: userId,
        team: team,
        game: game,
        tournament: league,
    });
    await newLeague.save();
    return newLeague._id;
};
