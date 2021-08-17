import { getUserByAuthId } from '../users'
import { getGoals } from './getGoals'

export const getGoalsRoute = {
  path: '/goals',
  method: 'get',
  handler: async (req, res) => {
    const { user_id: authId } = req.user
    try {
      const user = await getUserByAuthId(authId)
      const goals = await getGoals(user)
      return res.status(200).json(goals)
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message })
    }
  },
}
