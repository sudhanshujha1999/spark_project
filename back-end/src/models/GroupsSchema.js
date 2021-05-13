import mongoose from "mongoose";
import { VALID_GROUPS } from "./validGroups";
const { Schema } = mongoose;

const GroupsSchema = new Schema(
    {
        parent_groups: {
            type: Array,
            default: [],
            required: true,
        },
        name: {
            type: String,
            required: true,
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
        organization_level: String,
        location: String,
        // TAKEN PLAYERS AND DUPLICATING DATA CAUSE WE WILL NEED TO GET THAT PLAYER EVERY TIME A GROUP IS CALLED, THIS WILL BE POPULATED ONLY FOR TEAMS AND ROSTER
        players: [
            {
                id: { type: Schema.Types.ObjectId, ref: "groups" },
                name: String,
                email: String,
                gamerName: String,
                profile_img: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Groups = mongoose.model("groups", GroupsSchema);
