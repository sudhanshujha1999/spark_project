import { deleteRosterRoute } from "./deleteRosterRoute";
import { editRosterNameRoute } from "./editRosterNameRoute";
import { addRosterRoute } from "./addRosterRoute";

export { createRoster } from "./createRoster";
export { getRostersForTeam } from "./getRostersForTeam";
export { getRosterById } from "./getRosterById";

export const routes = [deleteRosterRoute, editRosterNameRoute, addRosterRoute];
