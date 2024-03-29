import { routes as emailVerificationRoutes } from './email-verification'
import { routes as invitationRoutes } from './invitations'
import { routes as notificationRoutes } from './notifications'
import { routes as onboardingRoutes } from './onboarding'
import { routes as permissionsRoutes } from './permissions'
import { routes as playerRoutes } from './players'
import { routes as rosterRoutes } from './rosters'
import { routes as schedulingRoutes } from './scheduling'
import { routes as schoolRoutes } from './schools'
import { routes as teamRoutes } from './teams'
import { routes as userRoutes } from './users'
import { routes as testRoutes } from './test'
import { routes as warRoomRoutes } from './war-room'
import { routes as statsRoutes } from './stats'
import { routes as scrimmageRoutes } from './scrimmage'
import { routes as goalRoutes } from './goals'
import { routes as authenticationRoutes } from './auth'
import { routes as communityGroupsRoute } from './community-groups'
import { routes as groupsRoute } from './groups'

export const routes = [
  ...emailVerificationRoutes,
  ...invitationRoutes,
  ...notificationRoutes,
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
  ...statsRoutes,
  ...scrimmageRoutes,
  ...goalRoutes,
  ...authenticationRoutes,
  ...communityGroupsRoute,
  ...groupsRoute,
]
