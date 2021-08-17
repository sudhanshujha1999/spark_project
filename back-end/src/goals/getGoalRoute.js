import { getGoal } from './getGoal'

export const getGoalRoute = {
  path: '/goal/:goalId',
  method: 'get',
  handler: async (req, res) => {
    try {
      const { goalId } = req.params
      const goal = await getGoal(goalId)
      return res.status(200).json(goal[0])
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message })
    }
  },
}
