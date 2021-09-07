import { useHistory } from 'react-router-dom'
import { Box, Button, Grid, Typography } from '../ui'
import { GoalBox } from './GoalBox'
import { useStyles } from './styles'

export const AllGoals = ({
  goals,
  isCoach,
  organizations,
  isLoadingOrganizations,
}) => {
  const classes = useStyles()
  const history = useHistory()
  const currentDate = new Date()

  let sortedOngoingGoals = {}
  let sortedPastGoals = {}

  if (goals.length > 0) {
    goals.forEach((goal) => {
      const formatedEndDate = new Date(goal.endDate)
      if (currentDate < formatedEndDate) {
        //ongoing goal
        if (Object.keys(sortedOngoingGoals).includes(goal.game)) {
          sortedOngoingGoals[`${goal.game}`].push(goal)
        } else {
          sortedOngoingGoals[`${goal.game}`] = [goal]
        }
      } else {
        //past goal
        if (Object.keys(sortedPastGoals).includes(goal.game)) {
          sortedPastGoals[`${goal.game}`].push(goal)
        } else {
          sortedPastGoals[`${goal.game}`] = [goal]
        }
      }
    })
  }
  return (
    <Grid>
      <Box>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Box mb={3}>
            {Object.keys(sortedOngoingGoals).length > 0 ? (
              <Typography className={classes.headingMedium}>
                Current Goals
              </Typography>
            ) : (
              <Typography>No ongoing goals right now!</Typography>
            )}
          </Box>
          {isCoach && (
            <Box mb={2}>
              <Button
                variant='contained'
                onClick={(e) => {
                  e.preventDefault()
                  history.push('/goals/chooseteam')
                }}
              >
                Create New Goal
              </Button>
            </Box>
          )}
        </Grid>
        {Object.keys(sortedOngoingGoals).length > 0 && (
          <Box className={`${classes.goalsContainer} ${classes.customScrollY}`}>
            <Grid container spacing={2}>
              {Object.keys(sortedOngoingGoals).map((gameName) => (
                <GoalBox
                  goals={sortedOngoingGoals[`${gameName}`]}
                  organizations={organizations}
                  isLoadingOrganizations={isLoadingOrganizations}
                />
              ))}
            </Grid>
          </Box>
        )}
      </Box>
      {Object.keys(sortedPastGoals).length > 0 && (
        <Box mb={8}>
          <Grid container>
            <Box mb={2}>
              <Typography className={classes.headingMedium}>
                Past Goals
              </Typography>
            </Box>
          </Grid>
          <Box className={`${classes.goalsContainer} ${classes.customScrollY}`}>
            <Grid container spacing={2}>
              {Object.keys(sortedPastGoals).map((gameName) => (
                <GoalBox
                  goals={sortedPastGoals[`${gameName}`]}
                  organizations={organizations}
                  isLoadingOrganizations={isLoadingOrganizations}
                />
              ))}
            </Grid>
          </Box>
        </Box>
      )}
    </Grid>
  )
}
