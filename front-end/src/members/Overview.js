import {
  Grid,
  Typography,
  Box,
  IconButton,
  TextField,
  CircularProgress,
} from '../ui'
import {
  CheckIcon,
  ClearAllIcon,
  EditIcon,
  GroupIcon,
  RecentActorsIcon,
  SportsEsportsIcon,
} from '../icons'
import { useStyles } from './styles'
import { useState } from 'react'
import { post } from '../network'

export const Overview = ({ user, teams, currentUserId, userId }) => {
  const classes = useStyles()
  const [editBio, setEditBio] = useState(false)
  const [bio, setBio] = useState(user.bio)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddBio = async () => {
    setIsLoading(true)
    const updates = { bio: bio }

    try {
      await post(`/api/users/${userId}`, { updates })
    } catch (error) {
      console.log(error.message)
    }
    setEditBio(!editBio)
    setIsLoading(false)
  }
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sm={6}
        md={3}
        className={`${classes.gridItem} ${classes.userBio}`}
      >
        <Grid
          className={`${classes.sectionHeading} ${classes.sectionBio}`}
          justifyContent='space-between'
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <RecentActorsIcon />
            <Typography style={{ fontSize: '25px', marginLeft: '5px' }}>
              Bio
            </Typography>
          </Box>
          {editBio && (
            <Typography className={classes.infoMessage} variant='caption'>
              Un-saved!
            </Typography>
          )}
          {currentUserId === userId && (
            <Box ml={2}>
              {isLoading ? (
                <CircularProgress color='secondary' />
              ) : editBio ? (
                <IconButton
                  size='small'
                  onClick={() => {
                    handleAddBio()
                  }}
                >
                  <CheckIcon size='small' />
                </IconButton>
              ) : (
                <IconButton
                  size='small'
                  onClick={() => {
                    setEditBio(!editBio)
                  }}
                >
                  <EditIcon size='small' />
                </IconButton>
              )}
            </Box>
          )}
        </Grid>
        {/* <Box display='flex' flexDirection='row' alignItems='center'> */}

        {/* </Box> */}

        <Box className={classes.bioTextBox} mt={1}>
          <TextField
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            variant='standard'
            multiline={true}
            placeholder='Bio'
            className={classes.multiLineTextField}
            disabled={!editBio}
            align='left'
            fullWidth
            size='medium'
            InputProps={{ disableUnderline: true }}
            style={{ maxHeight: '100px', overflowY: 'auto' }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={9} container>
        <Grid item xs={12} md={12} className={classes.gridItem}>
          <Box className={classes.sectionHeading}>
            <GroupIcon />
            <Typography>Teams</Typography>
          </Box>
          <Box>
            {teams.map((teamInfo) => (
              <Typography key={teamInfo._id} className={classes.textCenter}>
                {teamInfo.name}
              </Typography>
            ))}
          </Box>
        </Grid>
        {/* <Grid item xs={12} md={6} className={classes.gridItem}>
          <Box className={classes.sectionHeading}>
            <SportsEsportsIcon />
            <Typography>Games</Typography>
          </Box>
          <Box>
            {user.gamesAndRoles && user.gamesAndRoles.length > 0 ? (
              // teamInfo.name
              'GAMES'
            ) : (
              <Box className={classes.noGames}>
                <ClearAllIcon />
                <Typography>No Games Yet</Typography>
              </Box>
            )}
          </Box>
        </Grid> */}
      </Grid>
    </Grid>
  )
}
