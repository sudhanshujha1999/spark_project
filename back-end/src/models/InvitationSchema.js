import mongoose from "mongoose";
import { VALID_GROUPS } from "./validGroups";
const { Schema } = mongoose;

const InvitationSchema = new Schema(
    {
        confirmationCode: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        invitedBy: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        inTeamAlready: Boolean,
        teamId: String,
        inRosterAlready: Boolean,
        rosterId: String,
        playerHasOrganization: Boolean,
        organizationId: String,
        isConfirmed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Invitation = mongoose.model("invitation", InvitationSchema);
