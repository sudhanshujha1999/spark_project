import mongoose from "mongoose";
const { Schema } = mongoose;

const CommunityGroupsSchema = new Schema(
    {
        created_by: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        admins: [{ type: Schema.Types.ObjectId, ref: "users" }],
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        image_url: String,
        // Filled only orgs
        group_code: {
            type: String,
            required: true,
        },
        // to help searching in groups
        state: String,
        // TAKEN PLAYERS AND DUPLICATING DATA CAUSE WE WILL NEED TO GET THAT PLAYER EVERY TIME A GROUP IS CALLED, THIS WILL BE POPULATED ONLY FOR TEAMS AND ROSTER
        member_organizations: [
            {
                id: { type: Schema.Types.ObjectId, ref: "groups" },
                name: String,
                location: String,
            },
        ],
        bulletins: [
            {
                value: String,
                created_by: { type: Schema.Types.ObjectId, ref: "users" },
                creator_name: String,
                created_at: Date,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const CommunityGroups = mongoose.model("community-groups", CommunityGroupsSchema);
