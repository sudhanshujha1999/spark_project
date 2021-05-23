import { createOrganizationRoute } from "./createOrganizationRoute";

export const routes = [createOrganizationRoute];

export { createOrganization } from "./createSchool";
export { getSchoolForGroup } from "./getSchoolForGroup";
export { getSchoolsForUser } from "./getSchoolsForUser";
export { isCoachForSchool } from "./isCoachForSchool";
export { addMembersToSchool } from "./addMembersToSchool";
