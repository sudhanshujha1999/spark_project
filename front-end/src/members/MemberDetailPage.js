import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import gamerIcon from '../img/GamerIcon.svg'
import { ProfilePic } from './ProfilePic'
import { post, del } from '../network'
import { useNotes } from '../notes'
import { useUser, useCurrentUserInfo } from '../users'
import { useGetTeamsForUser, useOrganizations } from '../teams'
import { Overview } from './Overview'
import { Notes } from './Notes'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Tabs,
  Tab,
  Typography,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  IconButton,
} from '../ui'
import { useStyles } from './styles'
import { DiscordSvgIcon } from '../img/DiscordSvgIcon'
import { TwitchSvgIcon } from '../img/TwitchSvgIcon'
import { AddTwitch } from './AddTwitch'
import { DeleteIcon, EditIcon, SchoolIcon, SettingsIcon } from '../icons'
import { AddClassOf } from './AddClassOf'
import { useMemberIsCoach } from './useMemberIsCoach'

export const MemberDetailPage = ({ currentUserId }) => {
  const { memberId: memberIdFromParams, teamId } = useParams()

  const { organizations, isLoading: isLoadingOrganizations } =
    useOrganizations()

  const memberId = memberIdFromParams
    ? memberIdFromParams
    : currentUserId
    ? currentUserId
    : null
  const { isLoading, user } = useUser(memberId)
  const { isCoach } = useMemberIsCoach(organizations._id, user)
  console.log(user)
  console.log(isCoach)
  const { userInfo: currentUser } = useCurrentUserInfo()
  const { notes, setNotes } = useNotes(memberId, teamId)
  const teams = useGetTeamsForUser(user)
  const [value, setValue] = useState(0)
  const [open, setOpen] = useState(false)
  const tabLabel = ['Overview', 'Notes']
  const [addTwitch, setAddTwitch] = useState(false)
  const [twitchLink, setTwitchLink] = useState('')
  const [addClassOf, setAddClassOf] = useState(false)
  const [classOf, setClassOf] = useState('')

  useEffect(() => {
    if (user) {
      setTwitchLink(user.twitch)
      setClassOf(user.classOf)
    }
  }, [user])

  const baseURL = process.env.IS_PRODUCTION
    ? `https://sparkesports.gg/api`
    : process.env.IS_QA
    ? `https://dev.sparkesports.gg/api`
    : `http://localhost:8080/api`

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  // NEED TO REMOVE AFTER EVERTINH IS DONE
  const addNote = async (text) => {
    try {
      const response = await post(`/api/players/${memberId}/notes`, {
        text: text,
        groupId: teamId,
      })
      const newNote = response.data
      setNotes([newNote, ...notes])
    } catch (e) {
      console.log(e)
    }
  }

  const deleteNote = async (noteId) => {
    try {
      await del(`/api/players/${memberId}/notes/${noteId}`, { groupId: teamId })
      setNotes(notes.filter((note) => note.id !== noteId))
    } catch (e) {
      console.log(e)
    }
  }

  const classes = useStyles()

  const TABS = [
    teams ? (
      <Overview
        user={user}
        teams={teams}
        currentUserId={currentUser?._id}
        userId={user?._id}
      />
    ) : (
      <Box className={classes.load}>
        <CircularProgress color='secondary' />
      </Box>
    ),
    <Notes
      notes={notes}
      addNote={addNote}
      deleteNote={deleteNote}
      viewingOwnProfile={currentUserId === memberId}
    />,
  ]

  const actions = [
    {
      icon: (
        <IconButton component='label'>
          <EditIcon />
        </IconButton>
      ),
      name: 'Edit Link',
      handler: () => {
        setAddTwitch(true)
      },
    },
    // { icon: <DeleteIcon />, name: 'Remove Link', handler: () => {} },
  ]

  return isLoading ? (
    <p>Loading...</p>
  ) : user ? (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box className={classes.profileDetails}>
            {user && currentUser && (
              <ProfilePic
                isCuurentUser={user._id === currentUser._id}
                user={user}
              />
            )}
            <Box className={classes.detailsContent}>
              <Typography className={classes.name} gutterBottom variant='h2'>
                {user.full_name}
              </Typography>
              <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                mb={1}
              >
                <Box className={classes.gamerName}>
                  <img style={{ width: 20 }} src={gamerIcon} alt={gamerIcon} />
                  <Typography variant='h3'>{user.gamer_name}</Typography>
                </Box>
                <Box mr={1}>
                  {user?.discord.linked ? (
                    <Box className={classes.gamerName}>
                      <DiscordSvgIcon />
                      <Typography variant='h3'>
                        {`${user.discord.username}`}
                      </Typography>
                    </Box>
                  ) : user?._id === currentUser?._id ? (
                    <Button
                      href={`${baseURL}/discord/link/?dest=profile&email=${user.email}`}
                      className={classes.discordBtn}
                      startIcon={<DiscordSvgIcon />}
                    >
                      Link discord
                    </Button>
                  ) : (
                    <Box className={classes.gamerName}>
                      <DiscordSvgIcon />
                      <Typography variant='h6'>Discord</Typography>
                    </Box>
                  )}
                </Box>
                <Box mr={1}>
                  {user && twitchLink ? (
                    <Grid style={{ position: 'relative' }} container>
                      <Button
                        className={classes.gamerName}
                        style={{
                          padding: '6px 0',
                          marginRight: '0',
                        }}
                        href={twitchLink}
                        target='_blank'
                      >
                        <TwitchSvgIcon />
                      </Button>
                      {user?._id === currentUser?._id && (
                        <SpeedDial
                          ariaLabel='SpeedDial openIcon example'
                          className={classes.twitchSpeedDial}
                          FabProps={{
                            color: 'secondary',
                            className: classes.fab,
                          }}
                          direction='right'
                          hidden='true'
                          icon={
                            <SettingsIcon
                              style={{ fontSize: '16px', fill: '#5A3E85' }}
                            />
                          }
                          hidden={addTwitch}
                          onClose={() => setOpen(false)}
                          onOpen={() => setOpen(true)}
                          open={open}
                        >
                          {actions.map((action) => (
                            <SpeedDialAction
                              key={action.name}
                              icon={action.icon}
                              tooltipTitle={action.name}
                              onClick={action.handler}
                            />
                          ))}
                        </SpeedDial>
                      )}
                    </Grid>
                  ) : user?._id === currentUser?._id ? (
                    <Button
                      className={classes.discordBtn}
                      startIcon={<TwitchSvgIcon />}
                      onClick={() => setAddTwitch(true)}
                    >
                      Add Twitch
                    </Button>
                  ) : (
                    <Box className={classes.gamerName}>
                      <TwitchSvgIcon />
                      <Typography variant='h6'>Twitch</Typography>
                    </Box>
                  )}
                </Box>
              </Box>
              {addTwitch && (
                <AddTwitch
                  open={addTwitch}
                  setAddTwitch={setAddTwitch}
                  userId={user._id}
                  twitchLink={twitchLink}
                  setTwitchLink={setTwitchLink}
                />
              )}
              {!isLoadingOrganizations &&
                Object.keys(organizations).length > 0 && (
                  <Box
                    style={{
                      fontSize: '1.2em',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      justifyContent: 'center',
                      margin: 'auto',
                      padding: '10px',
                      width: 'fit-content',
                      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                    }}
                  >
                    {user && classOf ? (
                      <Box
                        style={{
                          fontSize: '1.2em',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          textAlign: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          className={classes.name}
                          style={{ fontSize: '1.2em' }}
                          gutterBottom
                          variant='h5'
                        >
                          {isCoach ? 'Coach since' : 'Class of'}
                        </Typography>
                        <Button
                          className={classes.classOfBtn}
                          disabled={user?._id !== currentUser?._id}
                          onClick={() => setAddClassOf(true)}
                        >
                          {classOf}
                        </Button>
                      </Box>
                    ) : (
                      user?._id === currentUser?._id && (
                        <Button
                          className={classes.classOfBtn}
                          startIcon={<SchoolIcon />}
                          onClick={() => setAddClassOf(true)}
                        >
                          {isCoach ? 'Add coach since' : 'Add class of'}
                        </Button>
                      )
                    )}
                    {addClassOf && (
                      <AddClassOf
                        open={addClassOf}
                        setAddClassOf={setAddClassOf}
                        userId={user._id}
                        classOf={classOf}
                        setClassOf={setClassOf}
                        isCoach={isCoach}
                      />
                    )}
                    <Typography>
                      <span
                        style={{
                          fontSize: '1.5em',
                          marginLeft: 5,
                          fontWeight: '700',
                          letterSpacing: '4px',
                          color: 'rgb(239 223 217)',
                          filter: 'drop-shadow(2px 4px 6px black)',
                        }}
                      >
                        {organizations.name}
                      </span>
                    </Typography>
                  </Box>
                )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Tabs
            textColor='secondary'
            indicatorColor='secondary'
            value={value}
            onChange={handleChange}
          >
            {tabLabel.map((item) => (
              <Tab label={item} key={item} />
            ))}
          </Tabs>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {TABS[value]}
        </Grid>
      </Grid>
    </>
  ) : (
    <Typography>User not found!</Typography>
  )
}
