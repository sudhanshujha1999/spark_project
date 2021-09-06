import { Typography, Box, Grid } from '../ui'
import { useHistory } from 'react-router-dom'
import { useStyles } from './styles'
import { GoalCardGraph } from './GoalCardGraph'
import moment from 'moment'
import { useState } from 'react'

export const GoalCard = ({ goal }) => {
  const classes = useStyles()
  const history = useHistory()

  const [avg, setAvg] = useState(0)

  const goToGoal = (id) => {
    history.push(`${id}/goals`)
  }
  return (
    <Box className={`${classes.container}`} onClick={() => goToGoal(goal._id)}>
      <Grid container>
        <Grid item xs={12} lg={7} md={7} sm={6}>
          <Box>
            <Typography className={classes.goalCardGoalName}>
              {goal.goalName}
            </Typography>
          </Box>
          <GoalCardGraph goal={goal} setAvg={setAvg} />
        </Grid>
        <Grid item xs={12} lg={5} md={5} sm={6}>
          <Box my={4} />
          <Box mx={2}>
            <Typography>
              Metric: <span style={{ fontSize: '14px' }}>{goal.metric}</span>
            </Typography>
            <Typography>
              Avg:{' '}
              {goal.data.length > 0 ? (
                <span
                  style={{
                    color: `${avg > goal.result ? '#2ecc71' : '#e74c3c'}`,
                  }}
                >
                  {avg}
                </span>
              ) : (
                '--'
              )}
            </Typography>
            <Typography>
              Desired: <span style={{ fontSize: '14px' }}>{goal.result}</span>
            </Typography>
            <Typography>
              Start:{' '}
              <span style={{ fontSize: '14px' }}>
                {moment(goal.startDate).format('DD MMM YYYY')}
              </span>
            </Typography>
            <Typography className={classes.date}>
              End:{' '}
              <span style={{ fontSize: '14px' }}>
                {moment(goal.endDate).format('DD MMM YYYY')}
              </span>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
