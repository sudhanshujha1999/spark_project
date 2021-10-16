import mongoose from "mongoose";
const { Schema } = mongoose;

const TournamentRegistrationSchema = new Schema(
    {
        registered_by: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        organization_id: {
            type: Schema.Types.ObjectId,
            ref: "groups",
        },
        roster_id: {
            type: Schema.Types.ObjectId,
            ref: "groups",
        },
        game_applied: String,
        is_roster_final: Boolean,
        final_player: [
            {
                id: { type: Schema.Types.ObjectId, ref: "users" },
                name: String,
                email: String,
                gamerName: String,
                profile_img: String,
                bio: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Registration = mongoose.model("registration", TournamentRegistrationSchema);
