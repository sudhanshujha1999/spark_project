import {
    isLoggedInProtector,
    isVerifiedProtector,
} from '../route-protectors';
import { getUserByAuthId } from './getUserByAuthId';
import { getUserById } from './getUserById';

export const getUserInfoRoute = {
    path: '/user-info/:userId',
    method: 'get',
    protectors: [
        isLoggedInProtector,
        isVerifiedProtector,
    ],
    handler: async (req, res) => {
        const authUser = req.user;
        const { userId } = req.params;
        const authUserInfo = await getUserByAuthId(authUser.user_id);
        const userInfo = await getUserById(userId);

        if (
            userInfo.authId === authUser.user_id ||
            authUserInfo.membershipTypeId === 'coach'
        ) {
            return res.status(200).json(userInfo);
        }

        return res.status(403).json({ message: 'Users can only view their own data' });
    },
}