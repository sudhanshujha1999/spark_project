import { Redirect, Route } from 'react-router-dom';
import { useCurrentUserInfo } from '../users';

export const OnboardingRoute = (props) => {
    const { isLoading, userInfo } = useCurrentUserInfo();

    return isLoading
        ? <p>Loading...</p>
        : !userInfo
            ? <Redirect to="/sign-in" />
            : userInfo.isOnboarded
                ? <Redirect to="/" />
                : <Route {...props} />
}