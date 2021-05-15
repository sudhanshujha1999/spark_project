import { Redirect, Route } from "react-router-dom";
import { useCurrentUserInfo } from "../users";

export const PublicRoute = (props) => {
    const { isLoading, userInfo } = useCurrentUserInfo(true);
    // This to check if there is user on public route and not onboarded then route to on-boarding else
    return isLoading && !userInfo ? (
        <p>Loading...</p>
    ) : userInfo ? (
        userInfo.isOnboarded ? (
            <Route Route {...props} />
        ) : (
            <Redirect to={"/onboarding/user-info"} />
        )
    ) : (
        <Route {...props} />
    );
};
