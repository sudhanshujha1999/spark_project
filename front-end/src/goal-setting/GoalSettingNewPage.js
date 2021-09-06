import React, { useState, useEffect } from 'react'
import { get } from '../network'
import { useHistory } from 'react-router-dom'
import { Box, Grid, Card, Button, Divider, CircularProgress } from '../ui'
import { useStyles } from './styles'
import { useCurrentUser } from '../auth'
import { useRecoilState } from 'recoil'
import { goalsState } from './recoilState'
import { useOrganizations } from '../teams'
import { useIsCoach } from '../users/useIsCoach'
import { AllGoals } from './AllGoals'

export const GoalSettingPage = () => {
  const history = useHistory()
  const classes = useStyles()
  const { organizations, isLoading: isLoadingOrganizations } =
    useOrganizations()
  const { isCoach } = useIsCoach(organizations._id)
  const { user } = useCurrentUser()
  const [isLoading, setIsLoading] = useState(true)
  const [goals, setGoals] = useRecoilState(goalsState)

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

  console.log(goals)

  return (
    <Box>
      {isLoading ? (
        <Box className={classes.loading}>
          <CircularProgress color='secondary' />
        </Box>
      ) : (
        <AllGoals
          goals={goals}
          isCoach={isCoach}
          organizations={organizations}
          isLoadingOrganizations={isLoadingOrganizations}
        />
      )}
    </Box>
  )
}
