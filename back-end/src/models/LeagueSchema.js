import mongoose from "mongoose";
const { Schema } = mongoose;

const LeagueSchema = new Schema(
    {
        created_by: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        groupId: {
            type: Schema.Types.ObjectId,
            ref: "groups",
        },
        team: String,
        tournament: String,
        game: String,
        ongoing: {
            type: Boolean,
            default: true,
        },
        finished: {
            type: Boolean,
            default: false,
        },
        matches: [
            {
                opponent: String,
                win: {
                    type: Boolean,
                    default: false,
                },
                lose: {
                    type: Boolean,
                    default: false,
                },
                notes: String,
                match_date: Date,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const League = mongoose.model("leagues", LeagueSchema);
