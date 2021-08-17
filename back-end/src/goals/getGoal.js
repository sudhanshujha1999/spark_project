import { Goal } from '../models'
export const getGoal = async (goalId) => {
  const goal = await Goal.find({ _id: goalId }).populate('player').lean()
  return goal
}
