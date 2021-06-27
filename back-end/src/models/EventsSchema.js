import mongoose from "mongoose";
import { VALID_EVENTS } from "./validEventTypes";
const { Schema } = mongoose;

const EventsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        created_by: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        background_color: {
            background: {
                type: String,
                default: "",
            },
            name: {
                type: String,
                default: "",
            },
        },
        description: {
            type: String,
            default: "",
        },
        invitees: [
            {
                id: { type: Schema.Types.ObjectId, ref: "users" },
                name: String,
                email: String,
                gamerName: String,
                bio: String,
                profile_img: String,
            },
        ],
        time: {
            type: String,
        },
        year: {
            type: String,
        },
        month: {
            type: String,
        },
        date: {
            type: Date,
        },
        // need all event types
        event_type: {
            type: String,
            validate: {
                validator: function (value) {
                    return VALID_EVENTS.includes(value);
                },
                message: (props) => `${props.value} is not a valid event!`,
            },
        },
        // we can add more id of specic event details we want
        war_room_session_id: {
            type: Schema.Types.ObjectId,
            ref: "war-room",
        },
    },
    {
        timestamps: true,
    }
);

export const Events = mongoose.model("events", EventsSchema);
