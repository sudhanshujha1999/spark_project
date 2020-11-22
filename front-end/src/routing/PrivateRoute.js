import { Redirect, Route, useLocation } from 'react-router-dom';
import pathMatch from 'path-match';
import { useUser } from '../auth';

const route = pathMatch({
    sensitive: false,
    strict: false,
    end: false,
});

const ignorePaths = ['/sign-in', '/create-account'];
const shouldRedirectAfterAuth = pathname =>
    !ignorePaths.some(path => {
        const matches = route(path);
        return matches(pathname);
    });

export const PrivateRoute = (props) => {
    const { isLoading, user } = useUser();
    const location = useLocation();
    const { pathname } = location;

    return isLoading
        ? <p>Loading...</p>
        : user
            ? <Route {...props} />
            : shouldRedirectAfterAuth(pathname)
                ? <Redirect to={`/sign-in?dest=${encodeURI(pathname)}`} />
                : <Redirect to="sign-in" />
}