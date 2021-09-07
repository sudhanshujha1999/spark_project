import { Goal } from '../models'
import { hasAdminAccess } from '../permissions/hasAdminAccess'

export const getGoals = async (user) => {
  const permissions = await hasAdminAccess({ userId: user._id })
  // console.log(permissions)
  const allowedGroups = permissions.map((permission) => permission.groupId)
  const goals = await Goal.find({
    $or: [
      { createdById: user._id },
      { player: { _id: user._id } },
      { teamId: allowedGroups },
    ],
  })
  return goals
}
