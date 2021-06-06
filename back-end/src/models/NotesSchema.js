import mongoose from "mongoose";
const { Schema } = mongoose;

const NotesSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        created_by: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
    },
    {
        timestamps: true,
    }
);

export const Notes = mongoose.model("notes", NotesSchema);
