import { createOrganizationRoute } from "./createOrganizationRoute";
import { addLeagueToOrganizationRoute } from "./addLeagueToOrganizationRoute";
import { getAllLeaguesForOrganizationRoute } from "./getAllLeaguesForOrganizationRoute";
import { deleteLeagueRoute } from "./deleteLeagueRoute";
import { addMatchInLeagueRoute } from "./addMatchInLeagueRoute";

export const routes = [
    createOrganizationRoute,
    addLeagueToOrganizationRoute,
    addMatchInLeagueRoute,
    getAllLeaguesForOrganizationRoute,
    deleteLeagueRoute,
];

// export { createOrganization } from "./createSchool";
export { getSchoolForGroup } from "./getSchoolForGroup";
export { getSchoolsForUser } from "./getSchoolsForUser";
export { isCoachForSchool } from "./isCoachForSchool";
export { addMembersToSchool } from "./addMembersToSchool";
