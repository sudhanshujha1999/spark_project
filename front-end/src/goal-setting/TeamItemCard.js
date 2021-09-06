import { Box, Grid, Typography, Button, IconButton } from '../ui'
import { SettingsIcon } from '../icons'
import { useHistory, Link } from 'react-router-dom'
import { useStyles } from './styles'
import banner from '../img/default-image.jpg'

export const TeamItemCard = ({
  team,
  isCoach,
  index,
  setShowAlert,
  metricData,
}) => {
  const classes = useStyles()
  const history = useHistory()

  const handleClick = () => {
    if (Object.keys(metricData).includes(team.game)) {
      history.push(`/goals/chooseplayer/?team=${team._id}`)
    } else {
      setShowAlert({
        type: 'warning',
        message: `Goal functions has not been added for ${team.game} so far, please stay tuned!`,
      })
    }
  }

  return (
    <Grid
      item
      xs={12}
      sm={4}
      lg={3}
      key={team._id}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'auto',
      }}
    >
      <Box className={classes.teamCard} onClick={handleClick}>
        <Box className={classes.rank}>{index}</Box>
        <Box className={classes.background} />
        <Box className={classes.front}>
          <Box
            className={classes.teamImg}
            style={{
              backgroundImage: team.image_url
                ? `url(${team.image_url})`
                : `url(${banner})`,
            }}
          />
          <Typography className={classes.teamName}>{team.name}</Typography>
        </Box>
        <Box className={classes.back}>
          <Typography gutterBottom className={classes.gameName}>
            {team.game}
          </Typography>
        </Box>
      </Box>
    </Grid>
  )
}
