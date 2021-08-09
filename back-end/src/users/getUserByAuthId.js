// MONGO_DB MIGTATION
import { Users } from '../models'

export const getUserByAuthId = async (id) => {
  const user = await Users.findOne({ auth_id: id })

  if (!user) return null

  return user
}
