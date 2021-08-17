import { getPlayerByGoalId } from '../users'
import { addGoalData } from './addGoalData'

export const addGoalDataRoute = {
  method: 'post',
  path: '/goal/add/:goalId',
  handler: async (req, res) => {
    const { goalId } = req.params
    const data = req.body
    const user = req.user
    const playerFromGoal = await getPlayerByGoalId(goalId)
    if (user.user_id === playerFromGoal.auth_id) {
      const updatedGoal = await addGoalData(goalId, data)
      res.send(updatedGoal)
    } else {
      res
        .status(403)
        .json({ message: 'User can only make changes to their own Goal' })
    }
  },
}
