import { League } from "../models";

export const addMatchToLeague = async ({ leagueId, opponent, note, date, win, lose }) => {
    if (!leagueId || !note || !date) {
        throw new Error("filed-not-found");
    }
    const matchToAdd = {
        opponent,
        match_date: new Date(date),
        win,
        lose,
        note,
    };
    await League.findByIdAndUpdate(leagueId, {
        $push: { matches: matchToAdd },
    });
};
