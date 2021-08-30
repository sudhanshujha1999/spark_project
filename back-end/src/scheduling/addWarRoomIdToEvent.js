import { Events } from '../models'

export const addWarRoomIdToEvent = async ({ eventId, warRoomId }) => {
  await Events.findByIdAndUpdate(eventId, { war_room_match_id: warRoomId })
}
