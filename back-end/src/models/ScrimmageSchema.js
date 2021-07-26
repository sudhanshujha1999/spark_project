import mongoose from "mongoose";
const { Schema } = mongoose;

const ScrimmageSchema = new Schema(
    {
        organizationId: {
            type: Schema.Types.ObjectId,
            ref: "groups",
        },
        organization_name: {
            type: String,
        },
        organization_logo: {
            type: String,
        },
        organization_location: {
            type: String,
        },
        game: {
            type: String,
            required: true,
        },
        teams: [
            {
                type: Schema.Types.ObjectId,
                ref: "groups",
            },
        ],
        date: {
            type: Date,
        },
        skill_level: {
            type: Number,
        },
        open: {
            type: Boolean,
            default: true,
        },
        created_by: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        coaches: [
            {
                id: { type: Schema.Types.ObjectId, ref: "users" },
                name: String,
            },
        ],
        requests: [
            {
                organizationId: {
                    type: Schema.Types.ObjectId,
                    ref: "groups",
                },
                organization_name: {
                    type: String,
                },
                organization_logo: {
                    type: String,
                },
                coachId: {
                    type: Schema.Types.ObjectId,
                    ref: "users",
                },
                coach_name: {
                    type: String,
                },
                coach_contact: {
                    type: String,
                },
                note: {
                    type: String,
                },
                skill_level: {
                    type: Number,
                },
                viewed: {
                    type: Boolean,
                    default: false,
                    required: true,
                },
                accepted: {
                    type: Boolean,
                    default: false,
                    required: true,
                },
                declined: {
                    type: Boolean,
                    default: false,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Scrimmage = mongoose.model("scrimmages", ScrimmageSchema);
