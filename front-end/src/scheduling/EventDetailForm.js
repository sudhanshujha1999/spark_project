import { useState } from 'react'
import { DeleteIcon, EditIcon } from '../icons'
import {
  Alert,
  Avatar,
  Box,
  Chip,
  IconButton,
  Divider,
  Typography,
  Grid,
} from '../ui'
import { useStyles } from './styles'
import moment from 'moment'

export const EventDetailForm = ({
  selectedEvent,
  userId,
  deleteEvent = async () => {},
  isCoach,
}) => {
  const { name, description, date, time, invitees } = selectedEvent
  const [error, setError] = useState('')
  const classes = useStyles()
  const onclickDelete = async () => {
    try {
      console.log(userId)
      console.log(selectedEvent.created_by)
      setError('')
      if (selectedEvent.created_by !== userId) {
        // check user permission
        setError("You don't have the permission to delete this event")
        return
      }
      await deleteEvent(selectedEvent._id)
      // console.log("send-req");
    } catch (error) {
      setError(error.message)
    }
  }
  const onclickEdit = async () => {
    // try {
    //   console.log(userId)
    //   console.log(selectedEvent.created_by)
    //   setError('')
    //   if (selectedEvent.created_by !== userId) {
    //     // check user permission
    //     setError("You don't have the permission to delete this event")
    //     return
    //   }
    //   await deleteEvent(selectedEvent._id)
    //   // console.log("send-req");
    // } catch (error) {
    //   setError(error.message)
    // }
  }
  return (
    <Box className={classes.eventDetailsForm}>
      <Box
        className={classes.gradient}
        style={{
          height: invitees.length > 7 ? '550px' : '100%',
          background: selectedEvent.background_color.background,
        }}
      />
      {isCoach && (
        <Grid className={classes.actionButtonContainer}>
          <IconButton className={classes.actionButton} onClick={onclickEdit}>
            <EditIcon />
          </IconButton>
          <IconButton className={classes.actionButton} onClick={onclickDelete}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      )}
      <Box mb={2}>
        <Typography variant='h4'>{name}</Typography>
      </Box>
      <Divider
        style={{
          borderBottom: `1px solid ${selectedEvent.background_color.background}`,
        }}
      />
      <Box mt={2} mb={3}>
        <Grid container>
          <Box mb={2} mr={3} className={classes.eventDetailsDateTimeBox}>
            <Typography variant='h6'>Date:</Typography>
            <Typography variant='h6'>
              {moment(date).format('DD MMM YYYY ddd')}
            </Typography>
          </Box>
          <Box mb={2} className={classes.eventDetailsDateTimeBox}>
            <Typography variant='h6'>Time:</Typography>
            <Typography variant='h6'>
              {moment(time).format('hh:mm A')}
            </Typography>
          </Box>
        </Grid>
        <Typography variant='h6' gutterBottom>
          Description:
        </Typography>
        <Box ml={2}>
          <Typography variant='body1'>{description}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box mb={2}>
        <Typography variant='h6'>Invitees:</Typography>
        <Box my={1} display='flex' flexDirection='row' flexWrap='wrap'>
          {invitees.map(({ name, profile_img }) => (
            <Chip
              style={{
                margin: '10px',
              }}
              variant='outlined'
              avatar={
                profile_img ? (
                  <Avatar color='secondary' alt={name} src={profile_img} />
                ) : (
                  <Avatar color='secondary'>{name.charAt(0)}</Avatar>
                )
              }
              label={name}
              onClick={() => console.log('make an onClick')}
            />
          ))}
        </Box>
      </Box>
      {error && (
        <Box my={1}>
          <Alert severity='error'>{error}</Alert>
        </Box>
      )}
    </Box>
  )
}
