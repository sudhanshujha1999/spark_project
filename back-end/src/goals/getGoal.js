import { Goal } from '../models'

export const getGoal = async (goalId, userId) => {
  const goal = await Goal.find({ _id: goalId }).populate('player').lean()
  return goal
}
