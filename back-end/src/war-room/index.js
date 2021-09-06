import { createWarRoomMatchRoute } from './createWarRoomMatchRoute'
import { getAllMatchesRoute } from './getAllMatchesRoute'
import { getWarRoomMatchRoute } from './getWarRoomMatchRoute'
import { saveSessionStageRoute } from './saveSessionStageRoute'

export const routes = [
  getAllMatchesRoute,
  getWarRoomMatchRoute,
  createWarRoomMatchRoute,
  saveSessionStageRoute,
]
