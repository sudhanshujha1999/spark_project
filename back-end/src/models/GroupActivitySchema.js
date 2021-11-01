import mongoose from "mongoose";
const { Schema } = mongoose;

const GroupActivitySchema = new Schema(
    {
        activity_name: String,
        activity_value: String,
        community_group: {
            type: Schema.Types.ObjectId,
            ref: "community-groups",
        },
    },
    {
        timestamps: true,
    }
);

export const CommunityGroupsActivity = mongoose.model("groups-activity", GroupActivitySchema);

export const GROUP_CREATED = "GROUP_CREATED";
export const ORGANIZATION_JOINED = "ORGANIZATION_JOINED";
export const ORGANIZATION_LEFT = "ORGANIZATION_LEFT";
