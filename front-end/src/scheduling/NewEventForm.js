import { useState } from 'react'
import { COLOR_CODES } from '../util/colorCodes'
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Tooltip,
  Typography,
  TimePicker,
  LocalizationProvider,
  AdapterDateFns,
  Modal,
} from '../ui'
import { makeStyles } from '@material-ui/styles'
import { AddPlayersInEvent } from './AddPlayersInEvent'
import { ColorPicker } from './ColorPicker'
import AddIcon from '@material-ui/icons/Add'

const validations = [
  {
    test: ({ name }) => name.length > 1,
    errorMessage: 'Name must be 2 characters or longer',
  },

  {
    test: ({ description }) => description.length > 0,
    errorMessage: 'You must add a description',
  },
]

export const NewEventForm = ({
  selectedDate,
  setSelectedDate,
  setShowNewEventModal,
  showNewEventModal,
  onSubmitEvent = () => {},
  sending,
  userId,
  allowedTeams,
}) => {
  const [date, setDate] = useState(selectedDate)
  const [name, setName] = useState('')
  const [colors, setColors] = useState(
    localStorage.getItem('colors')
      ? JSON.parse(localStorage.getItem('colors'))
      : COLOR_CODES
  )
  const [description, setDescription] = useState('')
  const [time, setTime] = useState(new Date())
  const [backgroundColor, setBackgroundColor] = useState(
    colors[colors.length - 1]
  )
  const [validationErrors, setValidationErrors] = useState([])
  const [invitees, setInvitees] = useState([])
  const [pickColor, setPickColor] = useState(false)

  // console.log(moment(now).format('HH:mm'))
  // console.log( moment(selectedDate).format('ddd MMM DD YYYY'))

  const classes = useStyles()

  const getValidationErrors = () => {
    const fields = { name, time, description }
    const errors = validations
      .filter((validation) => !validation.test(fields))
      .map((validation) => validation.errorMessage)
    return errors
  }

  const onClick = () => {
    const validationErrors = getValidationErrors()
    setValidationErrors(validationErrors)
    if (validationErrors.length > 0) return
    // right now there is no invitees Check
    onSubmitEvent({ name, date, description, time, invitees, backgroundColor })
  }

  return (
    <Modal
      open={showNewEventModal}
      onClose={() => {
        setSelectedDate(null)
        localStorage.setItem('colors', JSON.stringify(colors))
        setShowNewEventModal(false)
      }}
      disableScrollLock='true'
    >
      <Box className={`${classes.form} ${classes.customScroll}`}>
        <Grid
          container
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <h1>New Event For {date.toLocaleDateString()}</h1>
          </Box>
          <Box>
            <Button
              onClick={onClick}
              color='primary'
              disabled={sending}
              variant='contained'
            >
              {sending ? <CircularProgress color='primary' /> : <AddIcon />}
            </Button>
          </Box>
        </Grid>
        <Box mb={2}>
          <TextField
            label='Event Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant='outlined'
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <TextField
            label='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant='outlined'
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label='Select Time'
              value={time}
              onChange={(newValue) => {
                setTime(newValue)
              }}
              style={{ width: '100%' }}
              variant='outlined'
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Box mb={2} className={classes.displayRow}>
          {colors.map((color, i) => {
            return (
              <Box
                key={i}
                className={
                  backgroundColor.background === color.background
                    ? `${classes.active} ${classes.color}`
                    : classes.color
                }
                style={{
                  background: color.background,
                }}
                onClick={() => setBackgroundColor(color)}
                component='div'
              />
            )
          })}
          <Box
            className={classes.color}
            style={{
              color: '#fff',
              margin: '0',
            }}
            onClick={() => setPickColor(!pickColor)}
            component='div'
            mb={2}
          >
            <AddIcon
              className={pickColor ? classes.closeIcon : ''}
              style={{
                transition: 'transform 0.5s',
                position: 'relative',
                bottom: '1.5px',
                right: '1.5px',
              }}
            />
          </Box>
        </Box>
        {pickColor && (
          <ColorPicker
            setBackgroundColor={setBackgroundColor}
            setColors={setColors}
            colors={colors}
            setPickColor={setPickColor}
          />
        )}
        <Divider />
        <Box my={2}>
          <Typography variant='h6'>Invite players and/or captains:</Typography>
        </Box>
        <Box mb={2}>
          {invitees.length > 0 && (
            <>
              <Box ml={2} mb={2}>
                <Typography variant='subtitle2'>Invitees</Typography>
              </Box>
              {invitees.map((invitee) => (
                <Tooltip title={invitee.email}>
                  <Chip
                    label={invitee.name}
                    onDelete={() =>
                      setInvitees((prevState) =>
                        prevState.filter((value) => value.id !== invitee.id)
                      )
                    }
                    color='secondary'
                    variant='outlined'
                  />
                </Tooltip>
              ))}
            </>
          )}
        </Box>
        <AddPlayersInEvent
          userId={userId}
          invitees={invitees}
          setInvitees={setInvitees}
          allowedTeams={allowedTeams}
        />
        <Button
          onClick={onClick}
          color='primary'
          fullWidth
          disabled={sending}
          variant='contained'
        >
          {sending ? <CircularProgress color='primary' /> : <AddIcon />}
        </Button>
        {validationErrors.map((error) => (
          <Box mt={1}>
            <Alert severity='error'>{error}</Alert>
          </Box>
        ))}
      </Box>
    </Modal>
  )
}

const useStyles = makeStyles((theme) => ({
  displayRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  color: {
    borderRadius: '50%',
    height: 20,
    width: 20,
    cursor: 'pointer',
    marginRight: '10px',
  },
  form: {
    minWidth: 600,
    maxHeight: '80vh',
    padding: '0px 15px',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
  },
  customScroll: {
    '&::-webkit-scrollbar': {
      width: '8px',
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 10,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 10,
      opacity: '0.8',
      backgroundColor: '#895cf2',
    },
  },
  active: {
    transform: 'scale(1.3)',
    position: 'relative',
    '&::before': {
      position: 'absolute',
      top: 0,
      left: 0,
      content: '""',
      width: '100%',
      height: '100%',
      border: '2px solid #eaeaea',
      borderRadius: '50%',
    },
  },
  closeIcon: {
    transform: 'rotate(45deg)',
    color: 'red',
  },
}))
