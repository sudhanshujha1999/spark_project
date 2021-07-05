import { StatsInformation } from "../models";
import { fieldsValidation } from "./fieldsValidation";

export const addStatsInformation = async ({
    name,
    game,
    teamId,
    createdBy,
    isTeamStat = false,
    userAllowedId,
    interval,
    time,
    players = [],
    fields = [],
}) => {
    if (isTeamStat && !userAllowedId) {
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
        created_by: createdBy,
        is_team_stat: isTeamStat,
        user_allowed: userAllowedId,
        interval,
        time,
        players,
        fields,
    });
    await newStatsInfo.save();
    return newStatsInfo._id;
};
