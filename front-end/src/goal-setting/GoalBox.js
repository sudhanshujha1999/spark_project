import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography, Button, IconButton, Divider } from '../ui'
import { useHistory, Link } from 'react-router-dom'
import { useStyles } from './styles'
import { GoalCard } from './GoalCard'
import banner from '../img/default-image.jpg'

export const GoalBox = ({ goals, isLoadingOrganizations, organizations }) => {
  const classes = useStyles()
  const history = useHistory()
  const [gameDetails, setGameDetails] = useState({})

  useEffect(() => {
    if (
      !isLoadingOrganizations &&
      goals.length > 0 &&
      Object.keys(organizations).length > 0
    ) {
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
    <Grid container justifyContent='space-around' key={gameDetails._id}>
      <Box className={classes.goalbox}>
        <Box>
          <Typography className={classes.goalCardGameName}>
            {gameDetails.game}
          </Typography>
          {/* <Box
            className={classes.goalCardImg}
            style={{
              backgroundImage: gameDetails.image_url
                ? `url(${gameDetails.image_url})`
                : `url(${banner})`,
            }}
          /> */}
        </Box>
        <Divider
          style={{ width: '30%', alignSelf: 'center', margin: '0px 0 20px 0' }}
        />

        <Grid
          item
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          xs={12}
        >
          <Box
            className={`${classes.eventsContainer} ${classes.customScrollX}`}
          >
            {goals.map((goal) => (
              <Box mx={1.5} mb={3} key={goal._id}>
                <GoalCard goal={goal} />
              </Box>
            ))}
          </Box>
        </Grid>
      </Box>
    </Grid>
  )
}

GoalBox.defaultProps = {
  goals: [],
}
