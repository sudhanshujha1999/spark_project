import { Box, Button, Fade, Grid, Typography } from '../ui'
import { useStyles } from './styles'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MatchItem } from './MatchItem'

export const AllMatches = ({
  matches = [],
  height,
  organizations,
  isLoadingOrganizations,
  addMatch,
  handleAdd,
  isCoach,
}) => {
  const classes = useStyles()
  const history = useHistory()

  const [upcoming, setUpcoming] = useState([])
  const [past, setPast] = useState([])

  const goToMatch = (match) => {
    history.push(`/war-room/${match._id}/match`)
  }
  console.log(isLoadingOrganizations)

  useEffect(() => {
    if (matches.length > 0) {
      const CURRENT_TIME = new Date()
      const CURRENT_DATE = CURRENT_TIME.getDate()
      const CURRENT_MONTH = CURRENT_TIME.getMonth()
      const CURRENT_YEAR = CURRENT_TIME.getFullYear()

      const pastMatches = []
      const upcomingMatches = []
      for (let i = 0; i < matches.length; i++) {
        const matchTime = new Date(matches[i].date)
        const matchDate = matchTime.getDate()
        const matchMonth = matchTime.getMonth()
        const matchYear = matchTime.getFullYear()
        if (
          CURRENT_TIME.setHours(0, 0, 0, 0) === matchTime.setHours(0, 0, 0, 0)
        ) {
          console.log('same')
        }
        if (matchYear >= CURRENT_YEAR) {
          // sesion is upcoming
          if (matchMonth >= CURRENT_MONTH) {
            // sesion is upcoming
            if (matchDate >= CURRENT_DATE) {
              upcomingMatches.push(matches[i])
              continue
            }
          }
        }
        pastMatches.push(matches[i])
      }
      setUpcoming(upcomingMatches)
      setPast(pastMatches)
    }
  }, [matches])

  return (
    <Box ref={height}>
      <Grid container>
        {!isLoadingOrganizations && upcoming.length > 0 ? (
          <>
            <Grid container justifyContent='space-between' mb={3} mr={4}>
              <Box mb={2}>
                <Typography variant='h5' className={classes.headingMedium}>
                  Upcoming Matches
                </Typography>
              </Box>
              {isCoach && (
                <Box mb={1} mx={1}>
                  <Fade in={!addMatch}>
                    <Box>
                      <Box my={1.3} />
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={handleAdd}
                      >
                        Add a Match
                      </Button>
                    </Box>
                  </Fade>
                </Box>
              )}
            </Grid>
            <Grid item className={classes.eventGradient} xs={12}>
              <Box
                className={`${classes.eventsContainer} ${classes.customScrollX}`}
              >
                {upcoming.map((event, index) => (
                  <Box mx={1.5} key={index}>
                    <MatchItem
                      event={event}
                      goToMatch={goToMatch}
                      organizations={organizations}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
          </>
        ) : (
          <Grid container justifyContent='space-between' mb={3} mr={4}>
            <Box mb={2}>
              <Typography variant='h6'>No upcoming events...</Typography>
            </Box>
            {isCoach && (
              <Box mb={1} mx={1}>
                <Fade in={!addMatch}>
                  <Box>
                    <Box my={1.3} />
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleAdd}
                    >
                      Add a Match
                    </Button>
                  </Box>
                </Fade>
              </Box>
            )}
          </Grid>
        )}
        {!isLoadingOrganizations && past.length > 0 && (
          <>
            <Grid item xs={12}>
              <Box my={4}>
                <Typography variant='h5' className={classes.headingMedium}>
                  Past Matches
                </Typography>
              </Box>
            </Grid>
            <Grid item className={classes.eventGradient} xs={12}>
              <Box
                className={`${classes.eventsContainer} ${classes.customScrollX}`}
              >
                {past.map((event, index) => (
                  <Box mx={1.5} key={index}>
                    <MatchItem
                      event={event}
                      goToMatch={goToMatch}
                      organizations={organizations}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  )
}
