import { v4 as uuid } from 'uuid';
import { updatePlayer } from '../players';
import {
    isLoggedInProtector,
    isVerifiedProtector,
} from '../route-protectors';
import {
    getUserByAuthId,
    setUserToOnboarded,
} from '../users';

/*
    The client will send a request to this route
    when a player completes the onboarding flow
*/
export const onboardPlayerRoute = {
    method: 'post',
    path: '/users/:userId/onboarding/player',
    protectors: [
        isLoggedInProtector,
        isVerifiedProtector,
    ],
    handler: async (req, res) => {
        const { userId: authId } = req.params;
        const {
            fullName,
            gamerName,
            grade,
            socialMediaLinks,
            tshirtSize,
            gamesAndRoles,
            bio,
        } = req.body;
        const baseUrl = req.app.get('baseFrontEndUrl');
        const authUser = req.user;

        // 1. Make sure the user is trying to update their own data and not someone else's
        if (authId !== authUser.user_id) {
            return res.status(403).json({ message: 'Users can only update their own data' });
        }

        // 2. Load the corresponding user info from the database
        // (we really just need the corresponding id)
        const user = await getUserByAuthId(authId);
        const userId = user.id;

        // 3. Update the user's info to include all the onboarding data
        await updatePlayer(userId, {
            fullName,
            gamerName,
            grade,
            socialMediaLinks,
            tshirtSize,
            gamesAndRoles,
            bio,
        });

        // 4. Mark the user as onboarded so that they can use the site
        await setUserToOnboarded(userId);

        res.status(200).json();
    },
}