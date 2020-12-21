import { Switch, Route } from 'react-router-dom';
import {
    CoachOnboardingRoute,
    OnboardingRoute,
    PlayerOnboardingRoute,
    PrivateRoute,
} from './routing';
import { Box, NavBar, SideNav } from './ui';
import * as routeDefinitions from './routeDefinitions';

const routes = Object.values(routeDefinitions);

export const Routes = () => (
    <Switch>
        {routes.map((route, i) => {
            const RouteType = route.isPublic
                ? Route
                : route.isCoachOnboarding
                    ? CoachOnboardingRoute
                    : route.isPlayerOnboarding
                        ? PlayerOnboardingRoute
                        : route.isOnboarding
                            ? OnboardingRoute
                            : PrivateRoute;

            return (
                <RouteType key={i} path={route.path} exact>
                    {!route.hideNav && <NavBar />}
                    {!route.hideNav && <SideNav />}
                    <Box
                        ml={route.hideNav ? 0 : "240px"}
                        mt={route.hideNav ? 0 : "64px"}
                        p={route.hideNav ? 0 : 4}
                    >
                        <route.component />
                    </Box>
                </RouteType>
            )
        })}
    </Switch>
);