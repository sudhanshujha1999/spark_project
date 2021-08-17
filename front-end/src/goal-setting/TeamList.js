import { Link } from 'react-router-dom'
import { Card, Grid, Fab, Typography } from '../ui'
import { AddIcon } from '../icons'
import { TeamItemCard } from './TeamItemCard'
import { useStyles } from './styles'

export const TeamsList = ({
  school,
  teams,
  isCoach,
  editTeam,
  setShowAlert,
}) => {
  const classes = useStyles()
  return school && teams && teams.length > 0 ? (
    <Grid container spacing={2}>
      <Grid style={{ marginBottom: '30px' }} item xs={12}>
        <Typography variant='h5'>Your teams</Typography>
      </Grid>
      <Grid container spacing={4}>
        {teams.map((team, index) => {
          return (
            <TeamItemCard
              key={index}
              team={team}
              editTeam={editTeam}
              isCoach={isCoach}
              index={index + 1}
              setShowAlert={setShowAlert}
            />
          )
        })}
      </Grid>
    </Grid>
  ) : (
    <>
      <p>
        Looks like you haven't {!isCoach && 'been'} added {!isCoach && 'to'} any
        teams yet.
      </p>
    </>
  )
}
