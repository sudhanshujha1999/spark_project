import { EmailVerificationResult, CreateAccountPage, PleaseVerifyEmail, SignInPage } from "./auth";
import { DashboardPage } from "./dashboard";
import { GoalSettingPage } from "./goal-setting";
import { InvitationLandingPage } from "./invitations";
import { TermsAndPrivacy } from "./legal";
import { MemberDetailPage } from "./members";
import {
    AddPlayers,
    CreateTeams,
    NewTeamInfo,
    OnboardingComplete,
    PlayerInfo,
    SchoolInfo,
    UserInfo,
} from "./onboarding";
import { LandingPage } from "./landing-page";
import { RostersPage } from "./rosters";
import { SchedulingPage } from "./scheduling";
import { TeamInfoForm, EditTeamInfo } from "./teams";

export const createAccountRoute = {
    path: "/create-account",
    component: CreateAccountPage,
    isPublic: true,
    hideNav: true,
};

export const createTeamRoute = {
    path: "/schools/:schoolId/new-team",
    component: TeamInfoForm,
};

export const dashboardRoute = {
    path: "/dashboard",
    component: DashboardPage,
};

export const landingPageRoute = {
    path: "/",
    component: LandingPage,
    isPublic: true,
    hideNav: true,
};

export const emailVerificationResultRoute = {
    path: "/verification-result",
    component: EmailVerificationResult,
    isPublic: true,
    hideNav: true,
};

export const goalSettingRoute = {
    path: "/goals",
    component: GoalSettingPage,
};

export const invitationLandingRoute = {
    path: "/invitations/confirm",
    component: InvitationLandingPage,
    isPublic: true,
    hideNav: true,
};

export const editTeamPageRoute = {
    path: "/teams/:teamId/edit",
    component: EditTeamInfo,
};

export const memberDetailRoute = {
    path: "/teams/:teamId/rosters/:rosterId/members/:memberId",
    component: MemberDetailPage,
};

export const onboardingAddPlayersRoute = {
    path: "/onboarding/schools/:schoolId/teams/:teamId/players",
    component: AddPlayers,
    isCoachOnboarding: true,
    hideNav: true,
};

export const onboardingCompleteRoute = {
    path: "/onboarding/done",
    component: OnboardingComplete,
    isOnboarding: true,
    hideNav: true,
};

export const onboardingCreateTeamsRoute = {
    path: "/onboarding/schools/:schoolId/teams",
    component: CreateTeams,
    isCoachOnboarding: true,
    hideNav: true,
};

export const onboardingNewTeamInfoRoute = {
    path: "/onboarding/schools/:schoolId/teams/new",
    component: NewTeamInfo,
    isCoachOnboarding: true,
    hideNav: true,
};

export const onboardingPlayerInfoRoute = {
    path: "/onboarding/player-info",
    component: PlayerInfo,
    isPlayerOnboarding: true,
    hideNav: true,
};

export const onboardingSchoolInfoRoute = {
    path: "/onboarding/schools",
    component: SchoolInfo,
    isCoachOnboarding: true,
    hideNav: true,
};

export const onboardingUserInfoRoute = {
    path: "/onboarding/user-info",
    component: UserInfo,
    isCoachOnboarding: true,
    hideNav: true,
};

export const pleaseVerifyEmailRoute = {
    path: "/please-verify-email/:userId",
    component: PleaseVerifyEmail,
    isPublic: true,
    hideNav: true,
};

export const rostersRoute = {
    path: "/teams/:teamId",
    component: RostersPage,
};

export const schedulingRoute = {
    path: "/scheduling",
    component: SchedulingPage,
};

export const signInRoute = {
    path: "/sign-in",
    component: SignInPage,
    isPublic: true,
    hideNav: true,
};

export const termsAndPrivacyRoute = {
    path: "/terms-and-privacy",
    component: TermsAndPrivacy,
    isPublic: true,
    hideNav: true,
    newTab: true,
};
