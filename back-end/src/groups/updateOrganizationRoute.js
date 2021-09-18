import {
  isLoggedInProtector,
  isVerifiedProtector,
  isOnboardedProtector,
} from '../route-protectors'
import { getGroupById } from './getGroupById'
import { getUserByAuthId } from '../users'
import { updateOrganization } from './updateOrganization'

export const updateOrganizationRoute = {
  method: 'post',
  path: '/org/:orgId',
  protectors: [isLoggedInProtector, isVerifiedProtector, isOnboardedProtector],
  handler: async (req, res) => {
    const { orgId } = req.params
    const { updates } = req.body
    const user = req.user
    const userInfo = await getUserByAuthId(user.user_id)
    const organization = await getGroupById(orgId)
    if (
      JSON.stringify(userInfo._id) === JSON.stringify(organization.created_by)
    ) {
      try {
        await updateOrganization({ orgId, updates })
        res.status(200).send({
          success: true,
          message: 'Organization Updated',
        })
      } catch (error) {
        console.log(error)
        res.status(500).send({
          success: false,
          error: e,
        })
      }
    } else {
      res
        .status(403)
        .json({ message: 'Coaches can only make changes to the Organization!' })
    }
  },
}
