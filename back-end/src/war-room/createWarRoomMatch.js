import { WarRoom } from '../models'
import { addWarRoomIdToEvent } from '../scheduling/addWarRoomIdToEvent'

export const createWarRoomMatch = async ({
  matchName,
  team,
  game,
  opponentName,
  maps,
  eventId,
}) => {
  if (!eventId) {
    throw new Error('no-event-id-found')
  }
  const newWarRoom = new WarRoom({
    match_name: matchName,
    eventId: eventId,
    team,
    opponent_team: opponentName,
    game,
    maps: maps,
  })
  await newWarRoom.save()
  const warRoomId = newWarRoom._id
  await addWarRoomIdToEvent({
    eventId,
    warRoomId,
  })
  return warRoomId
}
