import { Redirect, Route } from 'react-router-dom';
import { useCurrentUserInfo } from '../users';

export const CoachOnboardingRoute = props => {
    const { isLoading, userInfo } = useCurrentUserInfo();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!userInfo) {
        return <Redirect to="/sign-in" />;
    }

    if (userInfo.isOnboarded) {
        return <Redirect to="/" />;
    }

    if (userInfo.membershipTypeId === 'player') {
        return <Redirect to="/onboarding/player-info" />
    }

    return <Route {...props} />;
}