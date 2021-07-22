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
} from '../ui'

export const CreateGoal = () => {
  const [goalName, setGoalName] = useState('')
  const [metric, setMetric] = useState('')
  const [result, setResult] = useState('')
  const [value, setValue] = useState([null, null])

  //   const handleCreate = async () => {
  //     if (!goalName || !metric || !result || !value ) {
  //         console.log("fill All fields");
  //         return;
  //     }
  //     const goalObject = {
  //       goalName,

  //     };
  //     setSaving(true);
  //     try {
  //         const {
  //             data: { sessionId },
  //         } = await post("/api/war-room", warRoomObject);
  //         console.log(sessionId);
  //         // REGISTER THE WAR ROOM SESSION AND MAKE INVITES FOR ALL THE PLAYERS
  //         history.push(`/war-room/${sessionId}/session`);
  //     } catch (error) {
  //         console.log(error.message);
  //     }
  //     setSaving(false);
  // };

  return (
    <CenteredContainer>
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
            <MenuItem value='kill'>kill</MenuItem>
            <MenuItem value='kd'>Kill/Death</MenuItem>
            <MenuItem value='wins/match'>Win %</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            calendars={1}
            value={value}
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
          onClick={(e) => e.preventDefault()}
          fullWidth
          variant='contained'
          size='large'
          // disabled={isProcessing}
          color='primary'
        >
          Create Goal
          {/* {isProcessing ? <CircularProgress /> : 'Create Account'} */}
        </Button>
      </Box>
    </CenteredContainer>
  )
}
