import { createGoalRoute } from './createGoalRoute'
import { getGoalRoute } from './getGoalRoute'
import { getGoalsRoute } from './getGoalsRoute'
import { addGoalDataRoute } from './addGoalDataRoute'
import { deleteGoalDataRoute } from './deleteGoalDataRoute'

export const routes = [
  createGoalRoute,
  getGoalsRoute,
  getGoalRoute,
  addGoalDataRoute,
  deleteGoalDataRoute,
]

export { createGoal } from './createGoal'
export { getGoals } from './getGoals'
export { getGoal } from './getGoal'
export { addGoalData } from './addGoalData'
import { deleteGoalData } from './deleteGoalData'
