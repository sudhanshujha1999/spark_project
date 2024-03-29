import {
    CreateAccountPage,
    DiscordRedirect,
    EmailVerificationResult,
    PleaseVerifyEmail,
    SignInPage,
} from "./auth";
import { DashboardPage, CreateOrganizationPage } from "./dashboard";
import { CommunityPage } from "./community";
import { GoalSettingPage, ChoosePlayer, ChooseTeam, CreateGoal, GoalPage } from "./goal-setting";
import { InvitationLandingPage } from "./invitations";
import { TermsAndPrivacy } from "./legal";
import { MemberDetailPage, ProfilePage } from "./members";
import { UserInfo, OnboardingComplete } from "./onboarding";
import { LandingPage } from "./landing-page";
import { RostersPage } from "./rosters";
import { SchedulingPage } from "./scheduling";
import { TeamInfoForm, EditTeamInfo } from "./teams";
import { WarRoom, MatchDetails, Scrimmages } from "./war-room";
import { GroupsPage, GroupDetailPage, EventsPage } from "./groups";
import {
    SparksTournamentPage,
    TournamentSettingsPage,
    TournamentDetailPage,
} from "./sparks-tournament";

export const createTeamRoute = {
    path: "/new-team/:id",
    component: TeamInfoForm,
};

export const communityPageRoute = {
    path: "/community",
    component: CommunityPage,
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
export const goalRoute = {
    path: "/:goalId/goals/",
    component: GoalPage,
};
export const goalChooseTeamRoute = {
    path: "/goals/chooseteam",
    component: ChooseTeam,
};

export const goalChoosePlayerRoute = {
    path: "/goals/chooseplayer",
    component: ChoosePlayer,
};
export const goalCreateRoute = {
    path: "/goals/create-goal",
    component: CreateGoal,
};

export const groupsPage = {
    path: "/groups/",
    component: GroupsPage,
};

export const groupsDetailPage = {
    path: "/:groupId/groups/",
    component: GroupDetailPage,
};

export const eventsPage = {
    path: "/:groupId/groups/events/",
    component: EventsPage,
};

export const invitationLandingRoute = {
    path: "/invitations/confirm",
    component: InvitationLandingPage,
    isPublic: true,
    hideNav: true,
};

export const sparksTournamentPage = {
    path: "/tournament/",
    component: SparksTournamentPage,
    isPublic: true,
    hideNav: true,
};

export const tournamentDetailPage = {
    path: "/:tournamentId/tournament/",
    component: TournamentDetailPage,
};

export const tournamentSettingsPage = {
    path: "/:tournamentId/tournament/settings/",
    component: TournamentSettingsPage,
};

export const editTeamPageRoute = {
    path: "/teams/:teamId/edit",
    component: EditTeamInfo,
};

export const memberDetailRoute = {
    path: "/teams/:teamId/members/:memberId", //'/teams/:teamId/rosters/:rosterId/members/:memberId'
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

export const createOrganization = {
    path: "/dashboard/create-organization",
    component: CreateOrganizationPage,
};

export const createAccountRoute = {
    path: "/create-account",
    component: CreateAccountPage,
    isPublic: true,
    hideNav: true,
};

export const DiscordRedirectRoute = {
    path: "/discord/auth/redirect/",
    component: DiscordRedirect,
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

export const allScrimmageRoute = {
    path: "/scrimmages",
    component: Scrimmages,
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
    path: "/war-room/:matchId/match",
    component: MatchDetails,
};
