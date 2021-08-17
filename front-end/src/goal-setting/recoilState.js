import { atom, selector } from 'recoil'

// all goals
export const goalsState = atom({
  key: 'goalsState',
  default: [],
})
//single goal
export const goalState = atom({
  key: 'goalState',
  default: {},
})
