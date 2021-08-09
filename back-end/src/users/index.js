import { createUserRoute } from './createUserRoute'
import { getSchoolsForUserRoute } from './getSchoolsForUserRoute'
import { getUserRoute } from './getUserRoute'
import { getUserInfoRoute } from './getUserInfoRoute'
import { updateUserRoute } from './updateUserRoute'

export const routes = [
  createUserRoute,
  getSchoolsForUserRoute,
  getUserRoute,
  getUserInfoRoute,
  updateUserRoute,
]

export { createUserInDB } from './createUserInDB'
export { getUserByEmail } from './getUserByEmail'
export { getUserById } from './getUserById'
export { getUserByAuthId } from './getUserByAuthId'
export { setUserToOnboarded } from './setUserToOnboarded'
export { updateUser } from './updateUser'
export { addOrganizationToPlayer } from './addOrganizationToPlayer'
export { getPlayerByGoalId } from './getPlayerByGoalId'
