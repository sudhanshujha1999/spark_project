import { StatsEntry, StatsInformation, Users } from "../models";

export const statFormForPlayer = async ({ playerId, statFormId, groupReportId }) => {
    const form = await StatsInformation.findById(statFormId);
    const player = await Users.findById(playerId);
    if (!form) {
        throw new Error("no-form-exist");
    }
    if (!player) {
        throw new Error("no-player-exist");
    }
    const records = createRecordsForPlayer(form.fields);
    // const newPlayerStat = new StatsEntry({
    //     playerId,
    //     statsId: statFormId,
    //     group_report_id: groupReportId,
    // });
};
