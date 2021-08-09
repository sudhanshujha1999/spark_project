import { Goal } from '../models'

export const deleteGoalData = async (goalId, dataId) => {
  const goal = await Goal.findById(goalId).populate('player')

  if (goal) {
    for (var i = 0; i < goal.data.length; i++) {
      if (goal.data[i]._id == dataId) {
        goal.data.splice(i, 1)
        break
      }
    }
  }
  const updatedGoal = await goal.save()

  return updatedGoal
}
