import { Redirect, Route } from 'react-router-dom';
import { useCurrentUserInfo } from '../users';

export const PlayerOnboardingRoute = props => {
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

    if (userInfo.membershipTypeId === 'coach') {
        return <Redirect to="/onboarding/user-info" />
    }

    return <Route {...props} />;
}