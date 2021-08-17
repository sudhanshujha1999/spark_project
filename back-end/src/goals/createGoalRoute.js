import { isLoggedInProtector, isVerifiedProtector } from '../route-protectors'
import { getUserByAuthId } from '../users'
import { createGoal } from './createGoal'

export const createGoalRoute = {
  path: '/create-goal',
  method: 'post',
  protectors: [isLoggedInProtector, isVerifiedProtector],
  handler: async (req, res) => {
    const authUser = req.user
    const {
      goalName,
      game,
      teamId,
      startDate,
      endDate,
      player,
      metric,
      result,
    } = req.body

    try {
      if (!goalName || !metric || !startDate || !endDate || !result) {
        return res
          .status(400)
          .json({ success: false, message: 'Please fill the required field' })
      }
      const user = await getUserByAuthId(authUser.user_id)
      const createdById = user._id

      // user creating the goal
      // const user = await getUserByAuthId(authUser.user_id);
      // const createdById = user._id;
      // const eventId = await createEvent({
      //     name: goalName,
      //     startdate: startDate,

      //     event_type: GOAL,
      //     description,
      //     created_by: createdById,
      //     invitees: [
      //         ...invitees,
      //         {
      //             id: user._id,
      //             name: user.full_name,
      //             email: user.email,
      //             gamerName: user.gamer_name,
      //             profile_img: user.profile_img,
      //             bio: user.bio,
      //         },
      //     ],
      // });
      // create a goal
      const goalId = await createGoal({
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
      // everything we  normally
      console.log('Goal-created')
      return res.status(200).json({
        success: true,
        goalId,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  },
}
