import mongoose from "mongoose";
const { Schema } = mongoose;

const WarRoomSchema = new Schema(
    {
        session_name: {
            type: String,
            required: true,
        },
        eventId: {
            type: Schema.Types.ObjectId,
            ref: "events",
            required: true,
        },
        team: {
            type: String,
            required: true,
        },
        opponent_team: {
            type: String,
            required: true,
        },
        game: {
            type: String,
        },
        map_name: {
            type: String,
        },
        description: {
            type: String,
        },
        map_link: {
            type: String,
        },
        // war room stages/canvas paths,
        stages: [
            {
                name: String,
                description: String,
                path: [],
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const WarRoom = mongoose.model("war-room", WarRoomSchema);
