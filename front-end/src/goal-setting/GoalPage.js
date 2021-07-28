import React, { useEffect, useState } from 'react'
import { get } from '../network'
import { useParams } from 'react-router-dom'
import { useStyles } from './styles'
import { useRecoilState } from 'recoil'
import { useCurrentUser } from '../auth'
import { goalState } from './recoilState'
import { Box, Divider, Grid, Typography } from '../ui'

export const GoalPage = () => {
  const { goalId } = useParams()
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(true)
  const [goal, setGoal] = useRecoilState(goalState)
  const { user } = useCurrentUser()

  console.log(goalId)
  useEffect(() => {
    const getGoal = async () => {
      setIsLoading(true)
      try {
        const { data } = await get(`/api/goal/${goalId}`)
        setGoal(data)
        console.log(data)
      } catch (error) {
        console.log(error.message)
      }
      setIsLoading(false)
    }
    if (user) {
      getGoal()
    }
    // eslint-disable-next-line
  }, [user])
  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : (
        <Box>
          <Typography variant='h2' className={classes.goalName}>
            {goal && (goal.goalName || '')}
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
              </Grid>
            </Grid>
            <Grid item container xs={12} sm={5}>
              <Typography
                className={classes.headingMedium}
                variant='h5'
                gutterBottom
              >
                Goal Overview
              </Typography>
              <Grid item xs={12} spacing={2}>
                <Typography className={classes.goalText} variant='h6'>
                  Game: {goal.game}
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
        </Box>
      )}
    </>
  )
}
