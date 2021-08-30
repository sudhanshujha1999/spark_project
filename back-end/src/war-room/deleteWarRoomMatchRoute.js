import { getPlayerByGoalId } from '../users'
import { deleteWarRoomMatch } from './deleteWarRoomMatch'

export const deleteWarRoomMatchRoute = {
  method: 'post',
  path: '/war-room/delete/:warRoomId',
  handler: async (req, res) => {
    const { warRoomId } = req.params
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
