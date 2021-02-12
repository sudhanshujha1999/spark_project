import { deleteRosterRoute } from "./deleteRosterRoute";
import { editRosterNameRoute } from "./editRosterNameRoute";

export { createRoster } from "./createRoster";
export { getRostersForTeam } from "./getRostersForTeam";
export { getRosterById } from "./getRosterById";

export const routes = [deleteRosterRoute, editRosterNameRoute];
