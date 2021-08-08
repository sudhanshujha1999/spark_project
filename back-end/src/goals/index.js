import { createGoalRoute } from './createGoalRoute'
import { getGoalRoute } from './getGoalRoute'
import { getGoalsRoute } from './getGoalsRoute'
import { addGoalDataRoute } from './addGoalDataRoute'

export const routes = [
  createGoalRoute,
  getGoalsRoute,
  getGoalRoute,
  addGoalDataRoute,
]

export { createGoal } from './createGoal'
export { getGoals } from './getGoals'
export { getGoal } from './getGoal'
export { addGoalData } from './addGoalData'
