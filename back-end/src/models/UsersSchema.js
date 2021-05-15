import mongoose from "mongoose";
const { Schema } = mongoose;

const UsersSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        auth_id: {
            type: String,
            required: true,
        },
        // invitation_from:,
        confirmationCode: String,
        full_name: String,
        gamer_name: String,
        profile_img: {
            type: String,
            default: null,
        },
        isConfirmed: Boolean,
        isOnboarded: Boolean,
        bio: String,
        organizations: [{ type: Schema.Types.ObjectId, ref: "groups" }],
    },
    {
        timestamps: true,
    }
);

export const Users = mongoose.model("users", UsersSchema);
