import { Goal } from '../models'

export const createGoal = async ({
  goalName,
  teamId,
  game,
  startDate,
  endDate,
  player,
  metric,
  result,
  createdById,
}) => {
  const newGoal = new Goal({
    goalName,
    teamId,
    game,
    startDate,
    endDate,
    player,
    metric,
    result,
    createdById,
  })
  await newGoal.save()
  return newGoal._id
}
