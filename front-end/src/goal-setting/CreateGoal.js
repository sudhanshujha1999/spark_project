import React, { useState } from 'react'
import {
  Box,
  CenteredContainer,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  AdapterDateFns,
  DateRangePicker,
  LocalizationProvider,
  InputLabel,
  FormControl,
  CircularProgress,
} from '../ui'
import { post } from '../network'
import { useLocation, useHistory } from 'react-router-dom'
import { useOrganizations } from '../teams'
import { metricData } from './metricData'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

export const CreateGoal = () => {
  const history = useHistory()
  let query = useQuery()
  const selectedTeamId = query.get('team')
  const selectedPlayerId = query.get('player')

  const [goalName, setGoalName] = useState('')
  const [metric, setMetric] = useState('')
  const [result, setResult] = useState('')
  const [value, setValue] = useState([null, null])
  const [saving, setSaving] = useState(false)
  const { organizations, isLoading: isLoadingOrganizations } =
    useOrganizations()

  const today = new Date()

  let selectedTeam = {}
  if (!isLoadingOrganizations && Object.keys(organizations).length > 0) {
    selectedTeam = organizations.teams.find(
      (team) => team._id === selectedTeamId
    )
  }

  const handleCreate = async () => {
    if (!goalName || !metric || !result || !value) {
      console.log('fill All fields')
      return
    }
    const goalObject = {
      goalName,
      teamId: selectedTeamId,
      game: selectedTeam ? selectedTeam.game : 'unknown',
      startDate: value[0],
      endDate: value[1],
      player: selectedPlayerId,
      metric,
      result,
    }
    setSaving(true)
    try {
      const {
        data: { goalId },
      } = await post('/api/create-goal', goalObject)
      console.log(goalId)
      // // REGISTER THE WAR ROOM SESSION AND MAKE INVITES FOR ALL THE PLAYERS
      history.push(`/goals`)
    } catch (error) {
      console.log(error.message)
    }
    setSaving(false)
  }

  return (
    <CenteredContainer disableScrollLock={true}>
      <Typography align='center'>
        <h1>Create Goal</h1>
      </Typography>

      <Box mb={2}>
        <TextField
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          fullWidth
          label='Goal Name'
          variant='outlined'
        />
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Metric</InputLabel>

          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Metric'
            variant='outlined'
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            MenuProps={{
              disableScrollLock: true,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              getContentAnchorEl: null,
            }}
          >
            {Object.keys(selectedTeam).length > 0 &&
              metricData[`${selectedTeam.game}`].map((metric, index) => (
                <MenuItem value={metric} key={index}>
                  {metric}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            calendars={1}
            value={value}
            minDate={today}
            onChange={(newValue) => {
              setValue(newValue)
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
      </Box>
      <Box mb={2}>
        <TextField
          value={result}
          onChange={(e) => setResult(e.target.value)}
          fullWidth
          label='Desired Result'
          type='number'
          min='0'
          variant='outlined'
        />
      </Box>
      {/* {!roleTypeFromInvitation &&
                <Box mb={2}>
                    <Grid container spacing={2}>
                        <RoleSelector
                            onChange={option => setSelectedRole(option)}
                            options={roleOptions}
                            selectedOption={selectedRole}
                        />
                    </Grid>
                </Box>
            } */}
      <Box mb={2}>
        <Button
          fullWidth
          variant='contained'
          size='large'
          color='primary'
          disabled={saving}
          onClick={handleCreate}
          variant='contained'
          color='primary'
        >
          {saving ? <CircularProgress color='secondary' /> : 'Create Goal'}
        </Button>
      </Box>
    </CenteredContainer>
  )
}
