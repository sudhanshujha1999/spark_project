import {
    EmailVerificationResult,
    CreateAccountPage,
    PleaseVerifyEmail,
    SignInPage,
} from './auth';
import { DashboardPage } from './dashboard';
import { InvitationLandingPage } from './invitations';
import { TermsAndPrivacy } from './legal';
import { AddMemberPage, MemberDetailPage } from './members';
import {
    AddPlayers,
    CreateTeams,
    NewTeamInfo,
    OnboardingComplete,
    PlayerInfo,
    SchoolInfo,
    UserInfo,
} from './onboarding';
import { RostersPage } from './rosters';

export const addMemberRoute = {
    path: '/teams/:teamId/rosters/:rosterId/add',
    component: AddMemberPage,
};

export const createAccountRoute = {
    path: '/create-account',
    component: CreateAccountPage,
    isPublic: true,
    hideNav: true,
};

export const dashboardRoute = {
    path: '/',
    component: DashboardPage,
};

export const emailVerificationResultRoute = {
    path: '/verification-result',
    component: EmailVerificationResult,
    isPublic: true,
    hideNav: true,
};

export const invitationLandingRoute = {
    path: '/invitations/confirm',
    component: InvitationLandingPage,
    isPublic: true,
    hideNav: true,
};

export const memberDetailRoute = {
    path: '/teams/:teamId/rosters/:rosterId/members/:memberId',
    component: MemberDetailPage,
};

export const onboardingAddPlayersRoute = {
    path: '/onboarding/schools/:schoolId/teams/:teamId/players',
    component: AddPlayers,
    isCoachOnboarding: true,
    hideNav: true,
};

export const onboardingCompleteRoute = {
    path: '/onboarding/done',
    component: OnboardingComplete,
    isOnboarding: true,
    hideNav: true,
};

export const onboardingCreateTeamsRoute = {
    path: '/onboarding/schools/:schoolId/teams',
    component: CreateTeams,
    isCoachOnboarding: true,
    hideNav: true,
};

export const onboardingNewTeamInfoRoute = {
    path: '/onboarding/schools/:schoolId/teams/new',
    component: NewTeamInfo,
    isCoachOnboarding: true,
    hideNav: true,
};

export const onboardingPlayerInfoRoute = {
    path: '/onboarding/player-info',
    component: PlayerInfo,
    isPlayerOnboarding: true,
    hideNav: true,
}

export const onboardingSchoolInfoRoute = {
    path: '/onboarding/schools',
    component: SchoolInfo,
    isCoachOnboarding: true,
    hideNav: true,
}

export const onboardingUserInfoRoute = {
    path: '/onboarding/user-info',
    component: UserInfo,
    isCoachOnboarding: true,
    hideNav: true,
};

export const pleaseVerifyEmailRoute = {
    path: '/please-verify-email/:userId',
    component: PleaseVerifyEmail,
    isPublic: true,
    hideNav: true,
};

export const rostersRoute = {
    path: '/teams/:teamId',
    component: RostersPage,
};

export const signInRoute = {
    path: '/sign-in',
    component: SignInPage,
    isPublic: true,
    hideNav: true,
};

export const termsAndPrivacyRoute = {
    path: '/terms-and-privacy',
    component: TermsAndPrivacy,
    isPublic: true,
    hideNav: true,
    newTab: true,
}