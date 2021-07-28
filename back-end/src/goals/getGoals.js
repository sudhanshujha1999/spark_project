import { Goal } from '../models'
export const getGoals = async (user) => {
  const goals = await Goal.find({ createdById: user._id })
  return goals
}
