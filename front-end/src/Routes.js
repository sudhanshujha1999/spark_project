import { Switch, Route } from 'react-router-dom';
import { AuthPage, PleaseVerifyEmail, EmailVerificationResult } from './auth';
import { DashboardPage } from './dashboard';
import { InvitationLandingPage } from './invitations';
import { AddMemberPage, MemberDetailPage } from './members';
import {
    AddPlayers,
    CreateTeams,
    NewTeamInfo,
    OnboardingComplete,
    SchoolInfo,
    UserInfo,
} from './onboarding';
import { RostersPage } from './rosters';
import { PrivateRoute, OnboardingRoute } from './routing';
import { Box, NavBar, SideNav } from './ui';

const routes = [{
    path: '/',
    component: DashboardPage,
}, {
    path: '/teams/:teamId',
    component: RostersPage,
}, {
    path: '/teams/:teamId/rosters/:rosterId/members/:memberId',
    component: MemberDetailPage,
}, {
    path: '/teams/:teamId/rosters/:rosterId/add',
    component: AddMemberPage,
}, {
    path: '/sign-in',
    component: AuthPage,
    isPublic: true,
    hideNav: true,
}, {
    path: '/please-verify-email/:userId',
    component: PleaseVerifyEmail,
    isPublic: true,
    hideNav: true,
}, {
    path: '/invitations',
    component: InvitationLandingPage,
    isPublic: true,
    hideNav: true,
}, {
    path: '/verification-result',
    component: EmailVerificationResult,
    isPublic: true,
    hideNav: true,
}, {
    path: '/onboarding/user-info',
    component: UserInfo,
    isOnboarding: true,
    hideNav: true,
}, {
    path: '/onboarding/school',
    component: SchoolInfo,
    isOnboarding: true,
    hideNav: true,
}, {
    path: '/onboarding/school/:schoolId/teams',
    component: CreateTeams,
    isOnboarding: true,
    hideNav: true,
}, {
    path: '/onboarding/school/:schoolId/teams/new',
    component: NewTeamInfo,
    isOnboarding: true,
    hideNav: true,
}, {
    path: '/onboarding/teams/:teamId/players',
    component: AddPlayers,
    isOnboarding: true,
    hideNav: true,
}, {
    path: '/onboarding/done',
    component: OnboardingComplete,
    isOnboarding: true,
    hideNav: true,
}];

export const Routes = () => (
    <Switch>
        {routes.map((route, i) => {
            console.log(route);
            const RouteType = route.isPublic
                ? Route
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
                        p={4}
                    >
                        <route.component />
                    </Box>
                </RouteType>
            )
        })}
    </Switch>
);