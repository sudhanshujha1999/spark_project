import { Groups } from '../models'

export const updateOrganization = async ({ orgId, updates }) => {
  let query = {}
  for (var key in updates) {
    //could also be req.query and req.params
    query[key] = updates[key] !== '' ? updates[key] : null
  }
  await Groups.findByIdAndUpdate(orgId, { $set: query }, { new: true })
}
