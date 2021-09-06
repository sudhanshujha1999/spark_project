import React, { useEffect, useState } from 'react'
import { get } from '../network'
import { useParams } from 'react-router-dom'
import { useStyles } from './styles'
import { useRecoilState } from 'recoil'
import { useCurrentUser } from '../auth'
import { goalState } from './recoilState'
import { Box, Divider, Grid, Typography, Fade, Button, Alert } from '../ui'
import { GoalGraph } from './GoalGraph'
import { useCurrentUserInfo } from '../users'
import { AddGoalData } from './AddGoalData'
import { DataCard } from './DataCard'
import { Collapse, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import moment from 'moment'

export const GoalPage = () => {
  const { goalId } = useParams()
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(true)
  const [addData, setAddData] = useState(false)
  const [showData, setShowData] = useState(false)
  const [goal, setGoal] = useRecoilState(goalState)
  const [showDeleteAlert, setShowDeleteAlert] = useState(null)
  const { userInfo } = useCurrentUserInfo()

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
            <Box mt={2} mb={4}>
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
                      result={goal.result}
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
                    <strong style={{ color: '#474787', fontSize: '1.4em' }}>
                      Game:
                    </strong>{' '}
                    {goal.game}
                  </Typography>
                  <Typography className={classes.goalText} variant='h6'>
                    <strong style={{ color: '#474787', fontSize: '1.4em' }}>
                      Player:
                    </strong>{' '}
                    {goal.player.full_name}
                  </Typography>
                  <Typography className={classes.goalText} variant='h6'>
                    <strong style={{ color: '#474787', fontSize: '1.4em' }}>
                      Metric:
                    </strong>{' '}
                    {goal.metric}
                  </Typography>
                  <Typography className={classes.goalText} variant='h6'>
                    <strong style={{ color: '#474787', fontSize: '1.4em' }}>
                      Start:
                    </strong>{' '}
                    {moment(goal.startDate).format('DD MMM YYYY')}
                  </Typography>
                  <Typography className={classes.goalText} variant='h6'>
                    <strong style={{ color: '#474787', fontSize: '1.4em' }}>
                      End:
                    </strong>{' '}
                    {moment(goal.endDate).format('DD MMM YYYY')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {goal.player._id === userInfo._id && (
              <Fade in={!addData} mb={2}>
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

            <Box mb={2}>
              <Box my={5} />
              <Button
                variant='contained'
                color={showData ? 'secondary' : 'primary'}
                onClick={() => setShowData(!showData)}
              >
                {showData ? 'Hide Data' : 'Show Data'}
              </Button>
            </Box>
            {showDeleteAlert && (
              <Collapse
                in={Boolean(showDeleteAlert)}
                timeout='auto'
                unmountOnExit={true}
              >
                <Alert
                  variant='outlined'
                  severity='success'
                  style={{
                    borderRadius: '10px',
                    margin: '10px 10%',
                    textAlign: 'center',
                  }}
                  action={
                    <IconButton
                      aria-label='close'
                      color='inherit'
                      size='small'
                      onClick={() => {
                        setShowDeleteAlert('')
                      }}
                    >
                      <CloseIcon fontSize='inherit' />
                    </IconButton>
                  }
                >
                  {showDeleteAlert}
                </Alert>
              </Collapse>
            )}
            {showData && (
              <Box className={classes.datasContainer}>
                {goal.data.length > 0
                  ? goal.data.map((data, index) => (
                      <DataCard
                        data={data}
                        index={index + 1}
                        goalId={goal._id}
                        key={data._id}
                        canDelete={goal.player._id === userInfo._id}
                        setShowDeleteAlert={setShowDeleteAlert}
                      />
                    ))
                  : 'No data so far. Please add some data to see it here.'}
              </Box>
            )}
          </Box>
        )
      )}
    </>
  )
}
