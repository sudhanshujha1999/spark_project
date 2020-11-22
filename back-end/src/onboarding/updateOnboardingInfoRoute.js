import { updateOnboardingInfo } from './updateOnboardingInfo';

export const updateOnboardingInfoRoute = {
    method: 'post',
    path: '/user/:userId/onboarding',
    isProtected: true,
    handler: async (req, res) => {
        const { userId } = req.params;
        const { updates } = req.body;
        const user = req.user;

        if (userId === user.user_id) {
            const updated = updateOnboarding(userId, updates);
            res.status(200).json(updated);
        } else {
            res.status(403).json({ message: 'Users can only update their own data' });
        }
    },
}