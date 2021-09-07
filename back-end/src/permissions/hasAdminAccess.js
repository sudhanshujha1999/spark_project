import { Permissions } from '../models'
import { ADMIN, CAPTIAN } from './permissionTypes'

export const hasAdminAccess = async ({ userId }) => {
  const permissionExists = await Permissions.find({
    userId,
    permission_type: [ADMIN, CAPTIAN],
  }).lean()
  return permissionExists
}
