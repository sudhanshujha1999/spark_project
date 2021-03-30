import { routes as emailVerificationRoutes } from './email-verification';
import { routes as invitationRoutes } from './invitations';
import { routes as onboardingRoutes } from './onboarding';
import { routes as permissionsRoutes } from './permissions';
import { routes as playerRoutes } from './players';
import { routes as rosterRoutes } from './rosters';
import { routes as schedulingRoutes } from './scheduling';
import { routes as schoolRoutes } from './schools';
import { routes as teamRoutes } from './teams';
import { routes as userRoutes } from './users';

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
];