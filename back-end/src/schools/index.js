import { createSchoolRoute } from './createSchoolRoute';

export const routes = [
    createSchoolRoute,
];

export { createSchool } from './createSchool';
export { getSchoolForGroup } from './getSchoolForGroup';
export { getSchoolsForUser } from './getSchoolsForUser';
export { isCoachForSchool } from './isCoachForSchool';
export { addMembersToSchool } from './addMembersToSchool';