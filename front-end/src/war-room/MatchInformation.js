import moment from 'moment'
import { useMemo, useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { CheckIcon, EditIcon, PlayArrowIcon } from '../icons'
import {
  Box,
  Button,
  Chip,
  Divider,
  Fade,
  Grid,
  Typography,
  Tooltip,
  TextField,
  IconButton,
} from '../ui'
import { saveDataFromInfo } from './recoilState'
import { useStyles } from './styles'
import { useOrganizations } from '../teams'

export const MatchInformation = ({
  match,
  startMatch,
  toggleMatch = () => {},
  isCoach,
  hasChanged,
  setHasChanged = () => {},
}) => {
  const classes = useStyles()
  const { organizations, isLoading: isLoadingOrganizations } =
    useOrganizations()
  const [invitees, setInvitees] = useState(match.invitees || [])
  const [strategy, setStrategy] = useState(
    match.match.strategy ? match.match.strategy : ''
  )
  const [editStrategy, setEditStrategy] = useState(false)
  const [description, setDescription] = useState(
    match.match.description ? match.match.description : ''
  )
  const [editDescription, setEditDescription] = useState(false)
  const [opponentStrategy, setOpponentStrategy] = useState(
    match.match.opponent_strategy ? match.match.opponent_strategy : ''
  )
  const [editOpponentStrategy, setEditOpponentStrategy] = useState(false)
  const saveStrategiesInRecoil = useSetRecoilState(saveDataFromInfo)
  const today = new Date()
  const timeLeft = moment(match.date).format('DD') - moment(today).format('DD')

  const saveData = () => {
    console.log('saving')
    saveStrategiesInRecoil({
      description,
      strategy,
      opponentStrategy,
    })
  }
  useEffect(() => {
    saveData()
    //eslint-disable-next-line
  }, [])

  // this will holdthe value of all the members roles
  // used so there is no delete for the coach or the one created the event
  const memoizedAllUserCurrentRole = useMemo(() => {
    if (match) {
      const creator = match.created_by
      const rolesArray = match.invitees.map((invitee) => {
        if (invitee.id === creator) {
          return true
        } else {
          return false
        }
      })
      return rolesArray
    } else {
      return []
    }
  }, [match])

  const toggleEditDescription = () => {
    if (!hasChanged) {
      setHasChanged(true)
    }
    if (editDescription) {
      saveData()
    }
    setEditDescription(!editDescription)
  }
  const toggleEditOur = () => {
    if (!hasChanged) {
      setHasChanged(true)
    }
    if (editStrategy) {
      saveData()
    }
    setEditStrategy(!editStrategy)
  }

  const toggleEditOpponent = () => {
    if (!hasChanged) {
      setHasChanged(true)
    }
    if (editOpponentStrategy) {
      saveData()
    }
    setEditOpponentStrategy(!editOpponentStrategy)
  }

  const handleRemove = (member) => {
    if (!hasChanged) {
      setHasChanged(true)
    }
    console.log('make it later')
    // you have to save it first to display the save button
    // setInvitees(invitees.filter((invitee) => invitee.id !== member.id));
  }

  const onStartMatch = () => {
    toggleMatch()
  }

  return (
    <Grid container>
      <Grid container mb={3}>
        <Grid item xs={12} md={4}>
          <Typography variant='h2'>{match.name}</Typography>
          <Typography variant='subtitle1'>
            {moment(match.date).format('DD MMM YYYY (ddd)')}
          </Typography>
          <Typography variant='subtitle1'>{match.game}</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Box className={classes.teamsVs}>
              <Box className={classes.vsContainer}>
                <Typography className={classes.vsSign}>VS</Typography>
              </Box>
              <Typography className={classes.teamName} component='span'>
                {organizations.name}

                {','}
                <span style={{ fontWeight: '200', fontSize: '15px' }}>
                  {match.match.team.name}
                </span>
              </Typography>
              <Typography className={classes.teamName} component='span'>
                {match.match.opponent_team}
              </Typography>
            </Box>
            <Box className={classes.daysToGo}>
              <Typography>
                {timeLeft > 0
                  ? `${timeLeft} days left`
                  : timeLeft < 0
                  ? `${Math.abs(timeLeft)} days ago`
                  : 'Today'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ padding: '30px' }}>
        <Grid item xs={12} sm={6}>
          <Box display='flex' flexDirection='row' alignItems='center'>
            <Typography className={classes.headingSmall} variant='h6'>
              Description:
            </Typography>
            {isCoach && (
              <Box ml={2}>
                <IconButton size='small' onClick={toggleEditDescription}>
                  {editDescription ? (
                    <CheckIcon size='small' />
                  ) : (
                    <EditIcon size='small' />
                  )}
                </IconButton>
              </Box>
            )}
            {editDescription && (
              <Typography className={classes.infoMessage} variant='caption'>
                Un-saved!
              </Typography>
            )}
          </Box>

          <Box className={classes.description} mt={3}>
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant='standard'
              multiline={true}
              placeholder='Description & Match-Info'
              className={classes.multiLineTextField}
              disabled={!editDescription}
              align='left'
              fullWidth
              size='medium'
              InputProps={{ disableUnderline: true }}
              style={{ maxHeight: '70px', overflowY: 'scroll' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography className={classes.headingSmall} variant='h6'>
              All members:
            </Typography>
          </Box>
          <Box mt={3}>
            {invitees.map((member, index) => (
              <Tooltip title={member.email}>
                <Chip
                  className={classes.membersChip}
                  label={member.name}
                  onDelete={
                    // !memoizedAllUserCurrentRole[index]
                    false ? () => handleRemove(member) : null
                  }
                  color='primary'
                  variant='outlined'
                />
              </Tooltip>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Grid container mb={4}>
        <Grid item xs={12}>
          <Divider />
          <Box my={2}>
            <Typography className={classes.headingMedium} variant='h5'>
              Match Strategy
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display='flex' flexDirection='row' alignItems='center'>
            <Typography variant='h6'> Our Strategy:</Typography>
            {isCoach && (
              <Box ml={2}>
                <IconButton size='small' onClick={toggleEditOur}>
                  {editStrategy ? (
                    <CheckIcon size='small' />
                  ) : (
                    <EditIcon size='small' />
                  )}
                </IconButton>
              </Box>
            )}
            {editStrategy && (
              <Typography className={classes.infoMessage} variant='caption'>
                Un-saved!
              </Typography>
            )}
          </Box>

          <Box className={classes.description} mt={3}>
            <TextField
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              variant='standard'
              multiline={true}
              placeholder="What's your strategy"
              className={classes.multiLineTextField}
              disabled={!editStrategy}
              align='left'
              fullWidth
              InputProps={{ disableUnderline: true }}
              style={{ maxHeight: '100px', overflowY: 'scroll' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display='flex' flexDirection='row' alignItems='center'>
            <Typography variant='h6'>Opponent Strategy:</Typography>
            {isCoach && (
              <Box ml={2}>
                <IconButton size='small' onClick={toggleEditOpponent}>
                  {editOpponentStrategy ? (
                    <CheckIcon size='small' />
                  ) : (
                    <EditIcon size='small' />
                  )}
                </IconButton>
              </Box>
            )}
            {editOpponentStrategy && (
              <Typography className={classes.infoMessage} variant='caption'>
                Un-saved!
              </Typography>
            )}
          </Box>
          <Box className={classes.description} mt={3}>
            <TextField
              value={opponentStrategy}
              onChange={(e) => setOpponentStrategy(e.target.value)}
              variant='standard'
              placeholder="What's your opponent strategy"
              multiline={true}
              className={classes.multiLineTextField}
              disabled={!editOpponentStrategy}
              align='left'
              fullWidth
              disableUnderline
              InputProps={{ disableUnderline: true }}
              style={{ maxHeight: '100px', overflowY: 'scroll' }}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Fade in={!startMatch}>
          <Button
            color='secondary'
            variant='outlined'
            endIcon={<PlayArrowIcon />}
            onClick={onStartMatch}
          >
            {isCoach ? 'Start map strategy' : 'View map strategy'}
          </Button>
        </Fade>
        <Box mb={4} />
      </Grid>
    </Grid>
  )
}
