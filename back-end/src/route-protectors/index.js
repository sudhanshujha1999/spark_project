import * as admin from "firebase-admin";
import { hasPermission } from "../permissions";
import { getUserByAuthId } from "../users";

export const isLoggedInProtector = {
    test: async (req) => !!req.user,
    errorCode: 401,
    errorMessage: "You must be logged in to access these resources",
};

export const isVerifiedProtector = {
    test: async (req) => req.user && req.user.email_verified,
    errorCode: 403,
    errorMessage: "You must verify your email before you can access these resources",
};

export const isOnboardedProtector = {
    test: async (req) => {
        if (!req.user) return false;
        const id = req.user.user_id;
        const user = await getUserByAuthId(id);
        if (!user) return false;

        return user.isOnboarded;
    },
    errorCode: 403,
    errorMessage: "You must complete the onboarding flow",
};

// export const hasPermissionProtector = permissionType => {
//     test: async req => {

//     }
//     errorCode: 403,
//     errorMessage: "User doesn't have the correct permissions to perform this action",
// }
