import { addPermissionsRoute } from './addPermissionsRoute';
import { removePermissionsRoute } from './removePermissionsRoute';

export const routes = [
    addPermissionsRoute,
    removePermissionsRoute,
];

export { hasPermission } from './hasPermission';
