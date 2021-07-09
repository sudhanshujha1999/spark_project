import mongoose from "mongoose";
const { Schema } = mongoose;

const PlayerStatsEntrySchema = new Schema(
    {
        statsId: {
            type: Schema.Types.ObjectId,
            ref: "stats-information",
        },
        group_report_id: {
            type: String,
        },
        player: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        records: {
            type: Map,
            default: {},
            // validate when created WRT to the fileds in stats-info fields
        },
    },
    {
        timestamps: true,
    }
);

export const StatsEntry = mongoose.model("stats-entry", PlayerStatsEntrySchema);
