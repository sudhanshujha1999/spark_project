import mongoose from "mongoose";
const { Schema } = mongoose;

const StatsInformationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        game: {
            type: String,
            required: true,
        },
        is_team_stat: {
            type: Boolean,
            default: false,
        },
        // captian for team
        user_allowed: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        teamId: {
            type: Schema.Types.ObjectId,
            ref: "groups",
        },
        created_by: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        interval: {
            type: String,
            validate: {
                validator: function (value) {
                    return [INTERVAL_DAILY, INTERVAL_WEEKLEY].includes(value);
                },
                message: (props) => `${props.value} is not a valid interval!`,
            },
        },
        players: [
            {
                type: Schema.Types.ObjectId,
                ref: "users",
            },
        ],
        time: {
            type: String,
        },
        fields: [
            {
                name: String,
                field_type: String,
                is_required: Boolean,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const StatsInformation = mongoose.model("stats-information", StatsInformationSchema);

export const INTERVAL_WEEKLEY = "WEEKLY";
export const INTERVAL_DAILY = "DAILY";
// supported types till now
// validate while creation
export const FIELD_TYPE_NUMBER = "NUMBER";
export const FIELD_TYPE_TEXT = "TEXT";

// current valid field types
export const VALID_FIELD_TYPES = [FIELD_TYPE_TEXT, FIELD_TYPE_NUMBER];
