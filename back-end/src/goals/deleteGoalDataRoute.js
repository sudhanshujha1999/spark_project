import { getPlayerByGoalId } from '../users'
import { deleteGoalData } from './deleteGoalData'

export const deleteGoalDataRoute = {
  method: 'post',
  path: '/goal/delete/:goalId',
  handler: async (req, res) => {
    const { goalId } = req.params
    const { dataId } = req.body
    const user = req.user
    const playerFromGoal = await getPlayerByGoalId(goalId)
    if (user.user_id === playerFromGoal.auth_id) {
      const updatedGoal = await deleteGoalData(goalId, dataId)
      res.send(updatedGoal)
    } else {
      res
        .status(403)
        .json({ message: 'User can only delete their own Goal data' })
    }
  },
}
