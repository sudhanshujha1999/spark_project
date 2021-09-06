import { Events } from '../models'

export const getWarRoomMatch = async ({ matchId, userId }) => {
  const match = await Events.findOne({
    war_room_match_id: matchId,
    'invitees.id': userId,
  })
    .lean()
    .populate('war_room_match_id')
  const { war_room_match_id, ...rest } = match
  return { ...rest, match: war_room_match_id }
}
