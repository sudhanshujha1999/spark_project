import mongoose from "mongoose";
const { Schema } = mongoose;

const NotificationsSchema = new Schema(
	{
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        message: {
            type: String,
            default: "",
        },
        createdAt: {
            type: Date,
			require: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Notifications = mongoose.model("notifications", NotificationsSchema);
