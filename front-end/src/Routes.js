import { Switch } from "react-router-dom";
import { PublicRoute, OnboardingRoute, PrivateRoute } from "./routing";
import { Box, NavBar, SideNav } from "./ui";
import * as routeDefinitions from "./routeDefinitions";
import { useCurrentUserInfo } from "./users";

const routes = Object.values(routeDefinitions);

export const Routes = () => {
    const { userInfo } = useCurrentUserInfo();
    return (
        <Switch>
            {routes.map((route, i) => {
                const RouteType = route.isPublic
                    ? PublicRoute
                    : route.isOnboarding
                    ? OnboardingRoute
                    : PrivateRoute;

                return (
                    <RouteType key={i} path={route.path} exact>
                        <NavBar />
                        {(!route.hideNav || (userInfo && userInfo.isOnboarded)) && <SideNav />}
                        <Box
                            ml={route.hideNav ? 0 : "64px"}
                            mt={route.hideNav ? 0 : "64px"}
                            p={route.hideNav ? 0 : 4}>
                            <route.component />
                        </Box>
                    </RouteType>
                );
            })}
        </Switch>
    );
};
