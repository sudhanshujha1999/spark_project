import { Redirect, Route, useLocation } from "react-router-dom";
import pathMatch from "path-match";
import { useCurrentUserInfo } from "../users";

const route = pathMatch({
    sensitive: false,
    strict: false,
    end: false,
});

const ignorePaths = ["/sign-in", "/create-account"];
const shouldRedirectAfterAuth = (pathname) =>
    !ignorePaths.some((path) => {
        const matches = route(path);
        return matches(pathname);
    });

export const PrivateRoute = (props) => {
    console.log("private");
    const { isLoading, userInfo } = useCurrentUserInfo();
    const location = useLocation();
    const { pathname } = location;
    return isLoading ? (
        <p>Loading...</p>
    ) : userInfo ? (
        userInfo.isOnboarded ? (
            <Route {...props} />
        ) : (
            <Redirect to={`/onboarding/user-info`} />
        )
    ) : (
        <Redirect to={`/`} />
    );
    // : shouldRedirectAfterAuth(pathname)
    //     ? <Redirect to={`/sign-in?dest=${encodeURI(pathname)}`} />
    //     : <Redirect to="sign-in" />
};
