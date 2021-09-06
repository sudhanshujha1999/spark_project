import {
  AdapterDateFns,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  LocalizationProvider,
  Modal,
  TextField,
  Typography,
} from '../ui'
import { post } from '../network'
import { ClearIcon } from '../icons'
import { useState, useEffect, useMemo } from 'react'
import { useTeam } from '../teams'
import { useStyles } from './styles'
import { mapsData } from './mapsData'
import { useHistory } from 'react-router-dom'
import { MenuItem } from '@material-ui/core'
import DatePicker from '@material-ui/lab/DatePicker'

export const AddWarRoomMatch = ({ handleCancel, teams, addMatch }) => {
  const [matchName, setMatchName] = useState('')
  // Needs to be from a Select Menu
  // fields to fill
  const [gameName, setGameName] = useState('')
  const [selectedTeam, setSelectedTeam] = useState('')
  const [maps, setMaps] = useState([])
  const [date, setDate] = useState(new Date())
  const [opponentTeam, setOpponentTeam] = useState('')
  //   const [selectedMapGame, setSelectedMApGame] = useState('')
  // used in processing
  const [saving, setSaving] = useState(false)
  const [players, setPlayers] = useState([])
  const [teamId, setTeamId] = useState(null)
  const { team, isLoading } = useTeam(teamId)
  const history = useHistory()
  const classes = useStyles()

  const handleAdd = async () => {
    if (
      !selectedTeam ||
      !gameName ||
      !opponentTeam ||
      !matchName ||
      !date ||
      !maps
    ) {
      console.log('fill All fields')
      return
    }
    const warRoomObject = {
      team: selectedTeam,
      game: gameName,

      opponentTeam: opponentTeam,
      eventName: matchName,
      eventDate: date,
      maps: maps,
      invitees: players,
    }
    setSaving(true)
    console.log(warRoomObject)
    try {
      const {
        data: { matchId },
      } = await post('/api/war-room', warRoomObject)
      console.log(matchId)
      // REGISTER THE WAR ROOM SESSION AND MAKE INVITES FOR ALL THE PLAYERS
      history.push(`/war-room/${matchId}/match`)
    } catch (error) {
      console.log(error.message)
    }
    setSaving(false)
  }

  //   useEffect(() => {
  //     if (teams) {
  //       let arrayTeam = {}
  //       teams.forEach((item) => (arrayTeam[`${item.name}`] = item))
  //       setSearchTeam(arrayTeam)
  //     }
  //   }, [teams])

  useEffect(() => {
    if (selectedTeam) {
      setTeamId(selectedTeam._id)
      setMaps(mapsData.filter((map) => map.groupName == selectedTeam.game))
    } else {
      setTeamId(null)
      setMaps([])
      setPlayers([])
    }
  }, [selectedTeam])

  const memoizedRosterState = useMemo(() => {
    // made the maps like that cause in future if we want to add maps db
    // then we can enter a new map with the groupid and map details and we will
    // modify the data here as we need
    let rosterState = {}
    if (!isLoading && team.rosters) {
      team.rosters.forEach((roster) => {
        let found = 0
        let total = roster.players.length
        roster.players.forEach((player) => {
          if (players.includes(player)) {
            found++
          }
        })
        rosterState[`${roster.name}`] =
          found === 0 ? 'none' : found < total ? 'some' : 'all'
      })
    }
    return rosterState
  }, [players, team.rosters])

  const onClickRoster = (roster) => {
    if (roster.players.length > 0) {
      const newPlayers = roster.players.filter(
        (player) =>
          !players.some((addedPlayers) => addedPlayers.email === player.email)
      )
      setPlayers([...players, ...newPlayers])
    }
  }

  const handleRemove = (playerToRemove) => {
    setPlayers(players.filter((playerItem) => playerItem !== playerToRemove))
  }

  return (
    <Modal
      open={addMatch}
      onClose={() => {
        handleCancel()
      }}
      disableScrollLock='true'
    >
      <Box className={`${classes.form} ${classes.customScroll}`}>
        <Grid container spacing={4}>
          {/* SESSION INFO */}
          <Grid item xs={12}>
            <Typography className={classes.matchHeading}>
              Add Match details
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box mb={2}>
              <TextField
                className={classes.matchTextfield}
                label='Match Name'
                variant='outlined'
                value={matchName}
                onChange={(e) => setMatchName(e.target.value)}
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <Autocomplete
                value={selectedTeam}
                options={teams.filter((option) => option.editEvents)}
                groupBy={(option) => option.game}
                onChange={(e, option) => {
                  console.log(option)
                  if (option) {
                    setSelectedTeam(option)
                    setPlayers([])
                    setGameName(option.game)
                  } else {
                    setSelectedTeam(null)
                    setPlayers([])
                    setGameName(null)
                  }
                }}
                getOptionLabel={(option) => (option.name ? option.name : '')}
                renderInput={(params) => (
                  <TextField
                    variant='outlined'
                    {...params}
                    label='Team'
                    margin='normal'
                  />
                )}
              />
            </Box>
            <Box mb={2}>
              <TextField
                variant='outlined'
                className={classes.matchTextfield}
                label='Opponent Name'
                value={opponentTeam}
                onChange={(e) => setOpponentTeam(e.target.value)}
                fullWidth
              />
            </Box>
            {teamId && (
              <Box className={classes.addPlayerContainer} mb={2}>
                <Box>
                  <Typography variant='h6'>Add players for Match</Typography>
                </Box>
                {players.length > 0 ? (
                  players.map((player) => (
                    <Box className={classes.players}>
                      <Typography>{player.email}</Typography>
                      <IconButton
                        size='small'
                        onClick={() => handleRemove(player)}
                      >
                        <ClearIcon fontSize='small' />
                      </IconButton>
                    </Box>
                  ))
                ) : (
                  <Typography style={{ textAlign: 'center' }}>
                    No player added
                  </Typography>
                )}
                <Typography variant='body1' className={classes.subtitle}>
                  From Rosters:
                </Typography>
                {isLoading ? (
                  <Box className={classes.rosterLoading}>
                    <CircularProgress color='secondary' />
                  </Box>
                ) : team.rosters && team.rosters.length > 0 ? (
                  team.rosters.map(
                    (roster) =>
                      roster.players.length > 0 && (
                        <Box
                          mb={2}
                          onClick={() => onClickRoster(roster)}
                          className={classes.rosterName}
                          style={{
                            boxShadow: `${
                              memoizedRosterState[`${roster.name}`] === 'all'
                                ? '0 0 2px #6ab04c'
                                : memoizedRosterState[`${roster.name}`] ===
                                  'some'
                                ? '0 0 2px #f9ca24'
                                : '0 0 2px #e84118'
                            }`,
                          }}
                        >
                          <Typography>
                            {roster.name === 'DEFAULT_ROSTER'
                              ? 'Free Players'
                              : roster.name}
                          </Typography>
                        </Box>
                      )
                  )
                ) : (
                  <Typography variant='subtitle2'>No rosters found</Typography>
                )}
              </Box>
            )}
            <Box mb={2}>
              {/* <DatePicker value={date} setValue={(value) => setDate(value)} /> */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label='Date for match'
                  value={date}
                  style={{ width: '100%' }}
                  // inputFormat='dd/MM/yyyy'
                  onChange={(newValue) => {
                    setDate(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </Grid>

          {/* ACTIONS */}
          <Grid container item xs={12} sm={12} spacing={4}>
            <Grid item xs={6} sm={6}>
              <Button
                fullWidth
                onClick={handleCancel}
                className={classes.deleteBtn}
                variant='contained'
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Button
                fullWidth
                disabled={saving}
                onClick={handleAdd}
                variant='contained'
                color='primary'
              >
                {saving ? <CircularProgress color='secondary' /> : 'Add'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}
//   const selectMap = (map) => {
//     setMap(map)
//   }
//   const memoizedGroupedMaps = useMemo(() => {
//     // made the maps like that cause in future if we want to add maps db
//     // then we can enter a new map with the groupid and map details and we will
//     // modify the data here as we need
//     let groupedMaps = {}
//     maps.forEach((map) => {
//       if (!groupedMaps[`${map.groupId}`]) {
//         const mapObject = {
//           id: map.groupId,
//           name: map.groupName,
//           maps: [],
//         }
//         mapObject.maps.push({
//           name: map.name,
//           link: map.link,
//         })
//         groupedMaps[`${map.groupId}`] = mapObject
//       } else {
//         groupedMaps[`${map.groupId}`].maps.push({
//           name: map.name,
//           link: map.link,
//         })
//       }
//     })
//     return groupedMaps
//   }, [])
{
  /* MAPS */
}
{
  /* <Grid item xs={12} sm={6}>
            <TextField
              select
              label='Game'
              variant='outlined'
              fullWidth
              value={selectedMapGame}
              className={classes.sessionTextfield}
              onChange={(e) => {
                setSelectedMApGame(e.target.value)
              }}
            >
              {Object.values(memoizedGroupedMaps).map(({ name, id }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            {selectedMapGame && (
              <Box display='flex' flexDirection='row' flexWrap='wrap'>
                {memoizedGroupedMaps[`${selectedMapGame}`].maps.map(
                  (mapItem) => (
                    <Box
                      className={classes.map}
                      onClick={() => selectMap(mapItem)}
                    >
                      <Box
                        className={
                          mapItem.name === map.name
                            ? `${classes.mapImage} ${classes.activeMap}`
                            : classes.mapImage
                        }
                        style={{
                          backgroundImage: `url(${mapItem.link})`,
                        }}
                      />
                      <Typography className={classes.subtitle}>
                        {mapItem.name}
                      </Typography>
                    </Box>
                  )
                )}
              </Box>
            )}
          </Grid> */
}
