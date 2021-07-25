import mongoose from "mongoose";
const { Schema } = mongoose;

const NotificationsSchema = new Schema(
	{
        userId: {
            type: String
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
