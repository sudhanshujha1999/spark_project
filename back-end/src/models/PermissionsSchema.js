import mongoose from "mongoose";
const { Schema } = mongoose;
import { VALID_PERMISSIONS } from "./validPermission";

const PermissionsSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        groupId: {
            type: Schema.Types.ObjectId,
            ref: "groups",
        },
        permission_type: {
            type: String,
            validate: {
                validator: function (value) {
                    return VALID_PERMISSIONS.includes(value);
                },
                message: (props) => `${props.value} is not a valid permissions group!`,
            },
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Permissions = mongoose.model("permissions", PermissionsSchema);
