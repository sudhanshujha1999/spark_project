import { Goal } from '../models'

export const addGoalData = async (goalId, data) => {
  const goal = await Goal.findById(goalId).populate('player')
  if (goal) {
    goal.data = data || goal.data
  }

  const updatedGoal = await goal.save()

  return updatedGoal
}
