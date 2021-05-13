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
        fullName: String,
        gamerName: String,
        profile_img: String,
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
