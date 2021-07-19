import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Grid, Card, Button, Divider } from '../ui'

export const GoalSettingPage = () => {
  const history = useHistory()
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
    </Box>
  )
}
