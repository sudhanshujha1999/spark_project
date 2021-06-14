import { routes as emailVerificationRoutes } from "./email-verification";
import { routes as invitationRoutes } from "./invitations";
import { routes as onboardingRoutes } from "./onboarding";
import { routes as permissionsRoutes } from "./permissions";
import { routes as playerRoutes } from "./players";
import { routes as rosterRoutes } from "./rosters";
import { routes as schedulingRoutes } from "./scheduling";
import { routes as schoolRoutes } from "./schools";
import { routes as teamRoutes } from "./teams";
import { routes as userRoutes } from "./users";
import { routes as testRoutes } from "./test";
import { routes as warRoomRoutes } from "./war-room";

export const routes = [
    ...emailVerificationRoutes,
    ...invitationRoutes,
    ...onboardingRoutes,
    ...permissionsRoutes,
    ...playerRoutes,
    ...rosterRoutes,
    ...schedulingRoutes,
    ...schoolRoutes,
    ...teamRoutes,
    ...userRoutes,
    ...testRoutes,
    ...warRoomRoutes,
];
