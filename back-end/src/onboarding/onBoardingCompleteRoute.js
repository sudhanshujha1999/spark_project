import { updateUser } from "../users";
import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "../users";

/*
    The client will send a request to this route
    when a player completes the onboarding flow
*/
export const onBoardingCompleteRoute = {
    method: "post",
    path: "/users/:userId/onboarding/complete",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        try {
            const { userId: authId } = req.params;
            const authUser = req.user;
            let params = req.body;
            params.isOnboarded = true;
            // 0. Can make a userFields check here

            // 1. Make sure the user is trying to update their own data and not someone else's
            if (authId !== authUser.user_id) {
                return res.status(403).json({ message: "Users can only update their own data" });
            }

            // 2. Load the corresponding user info from the database
            // (we really just need the corresponding id)
            const user = await getUserByAuthId(authId);
            const userId = user._id;

            // 3. Update the user's info to include all the onboarding data
            const newUser = await updateUser(userId, params);
            return res.status(200).json({ user: newUser });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Server Error" });
        }
    },
};
