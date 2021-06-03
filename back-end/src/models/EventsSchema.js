import mongoose from "mongoose";
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
                email: String,
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
    },
    {
        timestamps: true,
    }
);

export const Events = mongoose.model("events", EventsSchema);
