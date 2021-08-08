import { StatsInformation } from "../models";
import { fieldsValidation } from "./fieldsValidation";

export const addStatsInformation = async ({
    name,
    game,
    teamId,
    createdBy,
    forTeam = false,
    userAllowedId,
    interval,
    time,
    players = [],
    fields = [],
}) => {
    if (forTeam && !userAllowedId) {
        throw new Error("no-allowed-user");
    }
    if (players.length === 0) {
        throw new Error("no-players");
    }
    if (fields.length > 0) {
        if (!fieldsValidation(fields)) {
            throw new Error("invalid-fields");
        }
    } else {
        throw new Error("no-fields-to-track");
    }
    const newStatsInfo = new StatsInformation({
        name,
        teamId,
        game,
        is_stat: true,
        is_goal: false,
        created_by: createdBy,
        for_team: forTeam,
        user_allowed: userAllowedId,
        interval,
        time,
        players,
        fields,
    });
    await newStatsInfo.save();
    return newStatsInfo._id;
};
