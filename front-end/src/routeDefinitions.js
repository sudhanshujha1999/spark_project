import { CreateAccountPage, EmailVerificationResult, PleaseVerifyEmail, SignInPage } from "./auth";
import { DashboardPage } from "./dashboard";
import { GoalSettingPage } from "./goal-setting";
import { InvitationLandingPage } from "./invitations";
import { TermsAndPrivacy } from "./legal";
import { MemberDetailPage, ProfilePage } from "./members";
import { UserInfo, OnboardingComplete } from "./onboarding";
import { LandingPage } from "./landing-page";
import { RostersPage } from "./rosters";
import { SchedulingPage } from "./scheduling";
import { TeamInfoForm, EditTeamInfo } from "./teams";
import { WarRoom, Session } from "./war-room";

export const createTeamRoute = {
    path: "/new-team",
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

export const profileRoute = {
    path: "/profile/",
    component: ProfilePage,
};

export const onboardingCompleteRoute = {
    path: "/onboarding/done",
    component: OnboardingComplete,
    isOnboarding: true,
    hideNav: true,
};

export const createAccountRoute = {
    path: "/create-account",
    component: CreateAccountPage,
    isPublic: true,
    hideNav: true,
};

export const onboardingUserInfoRoute = {
    path: "/onboarding/user-info",
    component: UserInfo,
    isOnboarding: true,
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

export const warRoomRoute = {
    path: "/war-room",
    component: WarRoom,
};

export const warRoomSessionRoute = {
    path: "/war-room/:sessionId/session",
    component: Session,
};
