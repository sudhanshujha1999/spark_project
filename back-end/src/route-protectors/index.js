import * as admin from 'firebase-admin';

export const isLoggedInProtector = {
    test: async req => !!req.user,
    errorCode: 401,
    errorMessage: "You must be logged in to access these resources",
};

export const isVerifiedProtector = {
    test: async req => req.user && req.user.email_verified,
    errorCode: 403,
    errorMessage: "You must verify your email before you can access these resources",
};

export const isOnboardedProtector = {
    test: async req => {
        if (!req.user) return false;
        const id = req.user.user_id;
        const docSnapshot = await admin.firestore().collection('users')
            .doc(id)
            .get();

        if (!docSnapshot) return false;

        return docSnapshot.data().isOnboarded;
    },
    errorCode: 403,
    errorMessage: "You must complete the onboarding flow",
};
