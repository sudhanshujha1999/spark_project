import mongoose from "mongoose";
import { VALID_GROUPS, VALID_STATUS } from "./validGroups";
const { Schema } = mongoose;

const GroupsSchema = new Schema(
    {
        parent_groups: [
            {
                type: String,
            },
        ],
        created_by: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        // DUPLICATED WITH USERS
        admins: [
            {
                id: { type: Schema.Types.ObjectId, ref: "users" },
                name: String,
                email: String,
                profile_img: String,
                admin_type: String,
            },
        ],
        name: {
            type: String,
            required: true,
        },
        game: {
            type: String,
        },
        group_type: {
            type: String,
            validate: {
                validator: function (value) {
                    return VALID_GROUPS.includes(value);
                },
                message: (props) => `${props.value} is not a valid group!`,
            },
            required: true,
        },
        image_url: String,
        // Filled only orgs
        subscription_status: {
            type: String,
            validate: {
                validator: function (value) {
                    return VALID_STATUS.includes(value);
                },
                message: (props) => `${props.value} is not a valid status!`,
            },
        },
        subscription_endDate: Date,
        organization_code: String,
        orgType: String,
        city: String,
        state: String,
        zipCode: String,
        // TAKEN PLAYERS AND DUPLICATING DATA CAUSE WE WILL NEED TO GET THAT PLAYER EVERY TIME A GROUP IS CALLED, THIS WILL BE POPULATED ONLY FOR TEAMS AND ROSTER
        players: [
            {
                id: { type: Schema.Types.ObjectId, ref: "users" },
                name: String,
                email: String,
                gamerName: String,
                profile_img: String,
                bio: String,
                player_role: {
                    type: String,
                    default: "PLAYER",
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Groups = mongoose.model("groups", GroupsSchema);
