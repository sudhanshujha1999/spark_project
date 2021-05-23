import { Redirect, Route } from "react-router-dom";
import { useCurrentUserInfo } from "../users";
import { useQueryParams } from "./useQueryParams";

export const OnboardingRoute = (props) => {
    const { isLoading, userInfo } = useCurrentUserInfo();
    const { admin } = useQueryParams();
    if (admin === "true") {
        return <Route {...props} />;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!userInfo) {
        return <Redirect to='/sign-in' />;
    }

    if (userInfo.isOnboarded) {
        return <Redirect to='/dashboard' />;
    }

    return <Route {...props} />;
};
