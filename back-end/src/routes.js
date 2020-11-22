import { routes as playerRoutes } from './players';
import { routes as rosterRoutes } from './rosters';
import { routes as schoolRoutes } from './schools';
import { routes as teamRoutes } from './teams';
import { routes as userRoutes } from './users';

export const routes = [
    ...playerRoutes,
    ...rosterRoutes,
    ...schoolRoutes,
    ...teamRoutes,
    ...userRoutes,
];