import { Goal } from '../models'
import { hasAdminAccess } from '../permissions/hasAdminAccess'

export const deleteGoal = async ({ goalId, userId }) => {
  const permissions = await hasAdminAccess({ userId })
  // console.log(permissions)
  const allowedGroups = permissions.map((permission) => permission.groupId)
  const goal = await Goal.findById(goalId)
  // need to check which type of event is it
  // like war -room then delete the whole thing
  if (!goal) {
    // check if there is event
    throw new Error('goal-not-found')
  }
  if (
    goal.createdById != userId &&
    !allowedGroups.find((groupId) => {
      if (JSON.stringify(groupId) === JSON.stringify(goal.teamId)) {
        return true
      }
    })
  ) {
    // check permissionss
    throw new Error('not-authorized')
  }
  await Goal.findByIdAndDelete(goalId)
}
