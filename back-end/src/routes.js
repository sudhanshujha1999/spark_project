import { routes as emailVerificationRoutes } from './email-verification';
import { routes as invitationRoutes } from './invitations';
import { routes as onboardingRoutes } from './onboarding';
import { routes as playerRoutes } from './players';
import { routes as rosterRoutes } from './rosters';
import { routes as schoolRoutes } from './schools';
import { routes as teamRoutes } from './teams';
import { routes as userRoutes } from './users';

export const routes = [
    ...emailVerificationRoutes,
    ...invitationRoutes,
    ...onboardingRoutes,
    ...playerRoutes,
    ...rosterRoutes,
    ...schoolRoutes,
    ...teamRoutes,
    ...userRoutes,
];