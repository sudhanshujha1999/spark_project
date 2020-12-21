import {
    isLoggedInProtector,
    isVerifiedProtector,
    isOnboardedProtector,
} from '../route-protectors';
import { updateUser } from './updateUser';

export const updateUserRoute = {
    method: 'post',
    path: '/users/:userId',
    protectors: [
        isLoggedInProtector,
        isVerifiedProtector,
        isOnboardedProtector,
    ],
    handler: async (req, res) => {
        const { userId } = req.params;
        const { updates } = req.body;
        const user = req.user;

        if (user.user_id === userId) {
            const updatedUser = await updateUser(userId, updates);
            res.send(updatedUser);
        } else {
            res.status(403).json({ message: 'User can only make changes to their own info' });
        }
    },
};