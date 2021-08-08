import React, { useState, useEffect } from 'react'
import { get } from '../network'
import { useHistory } from 'react-router-dom'
import { Box, Grid, Card, Button, Divider, CircularProgress } from '../ui'
import { useStyles } from './styles'
import { useCurrentUser } from '../auth'
import { useRecoilState } from 'recoil'
import { goalsState } from './recoilState'
import { GoalCard } from './GoalCard'

export const GoalSettingPage = () => {
  const history = useHistory()
  const classes = useStyles()
  const { user } = useCurrentUser()
  const [isLoading, setIsLoading] = useState(true)
  const [goals, setGoals] = useRecoilState(goalsState)
  console.log(goals)
  useEffect(() => {
    const getGoals = async () => {
      setIsLoading(true)
      try {
        const { data } = await get('/api/goals')
        setGoals(data)
      } catch (error) {
        console.log(error.message)
      }
      setIsLoading(false)
    }
    if (user) {
      getGoals()
    }
    // eslint-disable-next-line
  }, [user])
  let sortedGoals = {
    leagueOfLegends: [],
    valorant: [],
  }

  if (goals.length > 0) {
    goals.forEach((goal) => {
      if (goal.game === 'League Of Legends') {
        sortedGoals.leagueOfLegends.push(goal)
      } else if (goal.game === 'Valorant') {
        sortedGoals.valorant.push(goal)
      }
    })
  }

  return (
    <Box>
      <Grid
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button
          style={{ width: '300px', height: '50px' }}
          variant='contained'
          onClick={(e) => {
            e.preventDefault()
            history.push('/goals/chooseteam')
          }}
        >
          Create New Goal
        </Button>
      </Grid>
      <Divider style={{ margin: '50px 0' }} />
      {isLoading ? (
        <Box className={classes.loading}>
          <CircularProgress color='secondary' />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {sortedGoals.leagueOfLegends.length > 0 && (
            <GoalCard goals={sortedGoals.leagueOfLegends} />
          )}
          {sortedGoals.valorant.length > 0 && (
            <GoalCard goals={sortedGoals.valorant} />
          )}
        </Grid>
      )}
    </Box>
  )
}
