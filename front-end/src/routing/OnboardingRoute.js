import { Redirect, Route } from "react-router-dom";
import { useCurrentUserInfo } from "../users";
import { useQueryParams } from "./useQueryParams";

export const OnboardingRoute = (props) => {
    const { isLoading, userInfo } = useCurrentUserInfo();
    const { admin } = useQueryParams();

    return isLoading ? (
        <p>Loading...</p>
    ) : !userInfo ? (
        <Redirect to='/sign-in' />
    ) : userInfo.isOnboarded || admin !== "true" ? (
        <Redirect to='/' />
    ) : (
        <Route {...props} />
    );
};
