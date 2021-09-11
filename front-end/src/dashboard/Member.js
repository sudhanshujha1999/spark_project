import { Box, Typography } from '../ui'
import { EachTeamMembers } from './EachTeamMembers'
import { useStyles } from './Styles'

export const Member = ({ teams }) => {
  const classes = useStyles()
  return (
    <Box className={classes.teamsContainer}>
      <Typography className={classes.headingMedium} variant='h5'>
        All Players
      </Typography>
      <Box my={2}>
        {teams.map((team) => (
          <EachTeamMembers team={team} />
        ))}
      </Box>
    </Box>
  )
}
