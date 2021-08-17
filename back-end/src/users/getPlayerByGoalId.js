// MONGO_DB MIGTATION
import { Goal } from '../models'

export const getPlayerByGoalId = async (id) => {
  const goal = await Goal.findById(id).populate('player').lean()

  if (!goal) return null

  return goal.player
}
