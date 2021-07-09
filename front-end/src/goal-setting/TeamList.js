import { Link } from 'react-router-dom'
import { Card, Grid, Fab, Typography } from '../ui'
import { AddIcon } from '../icons'
import { TeamItemCard } from './TeamItemCard'
import { useStyles } from './styles'

export const TeamsList = ({ school, teams, isCoach, editTeam }) => {
  const classes = useStyles()
  return school && teams && teams.length > 0 ? (
    <Grid container spacing={2}>
      <Grid style={{ marginBottom: '30px' }} item xs={12}>
        <Typography variant='h5'>Your teams</Typography>
      </Grid>
      {teams.map((team, index) => {
        return (
          <>
            <TeamItemCard
              key={index}
              team={team}
              editTeam={editTeam}
              isCoach={isCoach}
              index={index + 1}
            />
          </>
        )
      })}
      {isCoach && (
        <Link to={`/new-team/${school._id}?n1x=xj67bdsne12sxmlse`}>
          <Fab variant='extended' color='primary' className={classes.fab}>
            <AddIcon />
            Add Team
          </Fab>
        </Link>
      )}
    </Grid>
  ) : (
    <>
      <p>
        Looks like you haven't {!isCoach && 'been'} added {!isCoach && 'to'} any
        teams yet.
      </p>
      <Grid container>
        {isCoach && (
          <Grid item xs={3}>
            {school && (
              <Link to={`/new-team/${school._id}`}>
                <Card raised className={classes.cardStyles}>
                  <h3>+ Add a new team</h3>
                </Card>
              </Link>
            )}
          </Grid>
        )}
      </Grid>
    </>
  )
}
