import { Container, Grid, Button, Box, CircularProgress, Fade } from '../ui'
import { useOrganizations } from '../teams'
import { useIsCoach } from '../users/useIsCoach'
import { AllMatches } from './AllMatches'
import { useStyles } from './styles'
import { AddWarRoomMatch } from './AddWarRoomMatch'
import { useRef, useState } from 'react'
import { useGetAllMatches } from './useGetAllMatches'
import { LeagueRecords } from './LeagueRecords'

export const WarRoom = () => {
  const { organizations, isLoading: isLoadingOrganizations } =
    useOrganizations()
  const { isCoach } = useIsCoach(organizations._id)
  const { matches, isLoading: isLoadingMatches } = useGetAllMatches()
  const [addMatch, setAddMatch] = useState(false)
  const heightRef = useRef(null)
  const classes = useStyles()
  const handleAdd = () => {
    setAddMatch(true)
  }
  const handleCancel = () => {
    setAddMatch(false)
  }
  return (
    <Container maxWidth='xl'>
      {isLoadingMatches || isLoadingOrganizations || !organizations ? (
        <Box className={classes.loading}>
          <CircularProgress color='secondary' />
        </Box>
      ) : (
        <>
          <Grid container justifyContent='space-between'>
            <Grid item xs={12} md={7} lg={7} mb={5}>
              <AllMatches
                height={heightRef}
                matches={matches}
                organizations={organizations}
                isLoadingOrganizations={isLoadingOrganizations}
                addMatch={addMatch}
                handleAdd={handleAdd}
                isCoach={isCoach}
              />
              {isCoach && matches.length === 0 && (
                <Fade in={!addMatch}>
                  <Box>
                    <Box my={5} />
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleAdd}
                    >
                      Create a Match
                    </Button>
                  </Box>
                </Fade>
              )}
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              <LeagueRecords
                height={heightRef.current?.clientHeight}
                teams={organizations.teams}
                organizationId={organizations._id}
                isCoach={isCoach}
              />
            </Grid>
          </Grid>
          {addMatch && (
            <AddWarRoomMatch
              handleCancel={handleCancel}
              addMatch={addMatch}
              teams={organizations.teams}
            />
          )}
        </>
      )}
    </Container>
  )
}
