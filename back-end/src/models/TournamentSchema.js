import mongoose from "mongoose";
const { Schema } = mongoose;

const TournamentSchema = new Schema(
    {
        created_by_user: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        created_by_organization: {
            type: Schema.Types.ObjectId,
            ref: "groups",
        },
        name: {
            type: String,
            required: true,
        },
        start_date: {
            type: Date,
            required: true,
        },
        image_url: String,
        price_pool_description: {
            type: String,
            required: true,
        },
        entry_fee: {
            type: Number,
            required: true,
        },
        games: [
            {
                name: String,
            },
        ],
        registered_organizations: [
            {
                registration_id: { type: Schema.Types.ObjectId, ref: "registration" },
                organization_id: { type: Schema.Types.ObjectId, ref: "groups" },
                organization_name: String,
                rosterId: { type: Schema.Types.ObjectId, ref: "groups" },
                is_final: String,
                profile_img: String,
                game_applied: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Tournament = mongoose.model("tournament", TournamentSchema);
