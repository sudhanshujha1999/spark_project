import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography, Button, IconButton, Divider } from '../ui'
import { useHistory, Link } from 'react-router-dom'
import { useStyles } from './styles'
import { useOrganizations } from '../teams'
import banner from '../img/default-image.jpg'

export const GoalCard = ({ goals }) => {
  const classes = useStyles()
  const history = useHistory()
  const [gameDetails, setGameDetails] = useState({})

  const { organizations, isLoading: isLoadingOrganizations } =
    useOrganizations()

  useEffect(() => {
    if (!isLoadingOrganizations && goals.length > 0) {
      console.log(organizations)
      console.log(goals)
      const data = organizations.teams.find(
        (team) => team.game === goals[0].game
      )
      setGameDetails(data)
    }
  }, [organizations, goals])

  const goalClickHandler = (id) => {
    history.push(`/${id}/goals/`)
  }

  return (
    <Grid item xs={12} sm={4} lg={3} key={gameDetails._id}>
      <Box className={classes.goalCard}>
        <Box>
          <Box
            className={classes.goalCardImg}
            style={{
              backgroundImage: gameDetails.image_url
                ? `url(${gameDetails.image_url})`
                : `url(${banner})`,
            }}
          />
          <Typography className={classes.goalCardGameName}>
            {gameDetails.game}
          </Typography>
        </Box>
        <Divider style={{ width: '90%', margin: '10px 0 30px 0' }} />
        <Box>
          {goals.map((goal) => (
            <Typography
              className={classes.goalCardPlayerName}
              key={goal._id}
              onClick={() => goalClickHandler(goal._id)}
            >
              {goal.goalName}
            </Typography>
          ))}
        </Box>
      </Box>
    </Grid>
  )
}

GoalCard.defaultProps = {
  goals: [],
}
