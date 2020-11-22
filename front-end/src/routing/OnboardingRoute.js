import { Redirect, Route } from 'react-router-dom';
import { useUser } from '../auth';

export const OnboardingRoute = (props) => {
    const { isLoading, user } = useUser();

    return isLoading
        ? <p>Loading...</p>
        : !user 
            ? <Redirect to="/sign-in" />
            : user.onboarded
                ? <Redirect to="/" />
                : <Route {...props} />
}