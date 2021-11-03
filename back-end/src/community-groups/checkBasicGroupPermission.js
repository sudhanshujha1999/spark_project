import { CommunityGroups } from "../models";
import { Types } from "mongoose";

export const checkBasicGroupPermission = async ({ groupId, userId }) => {
    if (!userId) {
        throw new Error("no-user");
    }
    const group = await CommunityGroups.findById(groupId)
        .populate("member_organizations.id")
        .lean();
    const admins = group.member_organizations.reduce((currentAdmins, member) => {
        const adminArray = member.id?.admins;
        currentAdmins = [...currentAdmins, ...adminArray];
        return currentAdmins;
    }, []);
    // comparing only value
    const isAdmin = admins.some((admin) => `${admin.id}` === `${userId}`);
    return isAdmin;
};
