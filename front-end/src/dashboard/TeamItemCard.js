import { Box, Grid, Typography, Button, IconButton } from '../ui'
import { SettingsIcon } from '../icons'
import { useHistory, Link } from 'react-router-dom'
import { useStyles } from './Styles'
import { GroupIcon } from '../icons'
import banner from '../img/default-image.jpg'

export const TeamItemCard = ({ team, isCoach, index }) => {
  const classes = useStyles()
  const history = useHistory()
  const handleClick = () => {
    history.push(`/teams/${team._id}`)
  }
  const editTeam = () => {
    history.push(`/teams/${team._id}/edit`)
  }
  return (
    <Grid
      item
      style={{ width: 'fit-content', margin: '10px 20px 30px 20px' }}
      key={team._id}
    >
      <Box className={classes.teamCard} onClick={handleClick}>
        <Box className={classes.rank}>{index}</Box>
        <Box className={classes.background}></Box>
        <Box
          className={classes.teamImg}
          style={{
            backgroundImage: team.image_url
              ? `url(${team.image_url})`
              : `url(${banner})`,
            '&:hover': {
              backgroundImage: '',
            },
          }}
        />
        <Box className={classes.front}>
          <Box className={classes.back}>
            <Typography
              gutterBottom
              className={classes.gameName}
              style={{
                textAlign: 'center',
                padding: '0 10px',
                marginTop: '10px',
              }}
            >
              {team.game}
            </Typography>
            <button
              className={classes.teamCardBtn}
              onClick={(e) => {
                e.stopPropagation()
                handleClick()
                console.log('btn')
              }}
            >
              <span>Team Page</span>
              <span>
                <GroupIcon style={{ marginTop: '8px' }} />
              </span>
            </button>
          </Box>
          <Box className={classes.teamNameBox}>
            <Typography className={classes.teamName}>{team.name}</Typography>
            {isCoach && (
              <Link to={`/teams/${team.id}/edit`}>
                <IconButton
                  className={classes.iconBtn}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    editTeam()
                  }}
                >
                  <SettingsIcon size='small' className={classes.btnIcon} />
                </IconButton>
              </Link>
            )}
          </Box>
        </Box>
      </Box>
    </Grid>
  )
}
