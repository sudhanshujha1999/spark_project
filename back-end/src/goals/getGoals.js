import { Goal } from '../models'
export const getGoals = async (user) => {
  const goals = await Goal.find({
    $or: [{ createdById: user._id }, { player: { _id: user._id } }],
  })
  return goals
}
