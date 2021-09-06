import { WarRoom } from '../models'

export const updateWarRoomInfo = async ({ matchId, updateValues }) => {
  const updated = await WarRoom.findByIdAndUpdate(
    matchId,
    { $set: updateValues },
    { new: true }
  )
  if (!updated) {
    throw new Error('no-session-found')
  }
  return true
}
