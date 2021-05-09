import { addPermissionsRoute } from './addPermissionsRoute';
import { removePermissionsRoute } from './removePermissionsRoute';

export {
    ADMIN,
    PLAYER,
    CAN_VIEW_MEMBERS,
    CAN_EDIT_MEMBERS,
    CAN_VIEW_EVENTS,
    CAN_EDIT_EVENTS,
    CAN_VIEW_NOTES,
    CAN_EDIT_NOTES,
} from './permissionTypes';

export const routes = [
    addPermissionsRoute,
    removePermissionsRoute,
];

export { addPermission } from './addPermission';
export { hasPermission } from './hasPermission';
export { removePermission } from './removePermission';