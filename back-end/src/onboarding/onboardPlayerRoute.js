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

        if (authId !== authUser.user_id) {
            return res.status(403).json({ message: 'Users can only update their own data' });
        }

        const user = await getUserByAuthId(authId);
        const userId = user.id;

        await updatePlayer(userId, {
            fullName,
            gamerName,
            grade,
            socialMediaLinks,
            tshirtSize,
            gamesAndRoles,
            bio,
        });
        await setUserToOnboarded(userId);

        res.status(200).json();
    },
}