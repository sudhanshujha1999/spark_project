import { isLoggedInProtector } from '../route-protectors'
import { getUserByAuthId } from '../users'
import { getNotificationsForUser } from './getNotificationsForUser'

export const getNotificationsForUserRoute = {
  path: '/users/:userId/notifications',
  method: 'get',

  // Users must be logged in to make requests to this route, but they don't have to be verified
  protectors: [isLoggedInProtector],

  handler: async (req, res) => {
    // 1. Get all our data
    const { userId: authId } = req.params // authId is the automatically assigned id from Firebase Auth
    const authUser = req.user // This is the firebase user info, added by the 'addUserToRoute' middleware in server.js

    // 2. Make sure whoever sent this request is actually that user
    if (authId !== authUser.user_id) {
      return res
        .status(403)
        .json({ message: 'Users can only view their own notifications' })
    }

    const user = await getUserByAuthId(authId)

    // 3. Load the user's notifications from Mongo
    const notifications = await getNotificationsForUser(user.id)

    // 4. Send them back in the response
    res.status(200).json(notifications)
  },
}
