import React, { useEffect, useState } from 'react'
import { get } from '../network'
import { useParams } from 'react-router-dom'
import { useStyles } from './styles'
import { useRecoilState } from 'recoil'
import { useCurrentUser } from '../auth'
import { goalState } from './recoilState'
import { Box, Divider, Grid, Typography, Fade, Button } from '../ui'
import { GoalGraph } from './GoalGraph'
import { useCurrentUserInfo } from '../users'
import { AddGoalData } from './AddGoalData'

export const GoalPage = () => {
  const { goalId } = useParams()
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(true)
  const [addData, setAddData] = useState(false)
  const [goal, setGoal] = useRecoilState(goalState)
  const { userInfo } = useCurrentUserInfo()
  console.log(isLoading)
  console.log(goal)

  useEffect(() => {
    const getGoal = async () => {
      setIsLoading(true)
      try {
        const { data } = await get(`/api/goal/${goalId}`)
        setGoal(data)
      } catch (error) {
        console.log(error.message)
      }
      setIsLoading(false)
    }
    if (userInfo._id) {
      getGoal()
    }
  }, [userInfo._id, goalId])

  console.log(goal)
  const handleAdd = () => {
    setAddData(true)
  }
  const handleCancel = () => {
    setAddData(false)
  }

  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : (
        goal && (
          <Box>
            <Typography variant='h2' className={classes.goalName}>
              {goal &&
                (goal.goalName.charAt(0).toUpperCase() +
                  goal.goalName.slice(1) ||
                  '')}
            </Typography>
            <Box mt={2} mb={7}>
              <Divider />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={7} container>
                <Grid item xs={12}>
                  <Typography
                    className={classes.headingMedium}
                    variant='h5'
                    gutterBottom
                  >
                    Graph
                  </Typography>
                  <Grid>
                    <GoalGraph
                      startDate={goal.startDate}
                      endDate={goal.endDate}
                      metric={goal.metric}
                      goalData={goal.data}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography
                  className={classes.headingMedium}
                  variant='h5'
                  gutterBottom
                >
                  Goal Overview
                </Typography>
                <Grid item xs={12}>
                  <Typography className={classes.goalText} variant='h6'>
                    Game: {goal.game}
                  </Typography>
                  <Typography className={classes.goalText} variant='h6'>
                    Player: {goal.player.full_name}
                  </Typography>
                  <Typography className={classes.goalText} variant='h6'>
                    Metric: {goal.metric}
                  </Typography>
                  <Typography className={classes.goalText} variant='h6'>
                    Start: {goal.startDate.split('T')[0]}
                  </Typography>
                  <Typography className={classes.goalText} variant='h6'>
                    End: {goal.endDate.split('T')[0]}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {goal.player._id === userInfo._id && (
              <Fade in={!addData} mb={5}>
                <Box>
                  <Box my={5} />
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleAdd}
                  >
                    Add Data
                  </Button>
                </Box>
              </Fade>
            )}
            {addData && (
              <AddGoalData
                metric={goal.metric}
                open={Boolean(addData)}
                handleClose={handleCancel}
                goalId={goal._id}
                goalData={goal.data}
              />
            )}
          </Box>
        )
      )}
    </>
  )
}
