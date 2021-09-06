import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Box, Button, Container, Dialog, Grid, Typography } from '../ui'
import { CreateScrimmagePage } from './CreateScrimmagePage'
import { ScrimmagePost } from './ScrimmagePost'
import { useStyles } from './styles'
import { ChevronRightIcon } from '../icons'
import { GAMES as allGames, defaultLogo } from '../teams/defaultGames'
import { useScrimmages } from './useScrimmages'

export const Scrimmages = ({ isCoach, disabled }) => {
  const [openCreateScrimmage, setOpenCreateScrimmage] = useState(false)
  // we can passfilter as argument and can get filtered scrimmages
  const {
    isLoading,
    otherScrimmages: scrimmages,
    setUpdate: updateScrimmages,
  } = useScrimmages()
  const [filterByGames, setByGamesFilter] = useState([])

  const scrimmagesToDisplay = useMemo(() => {
    if (filterByGames.length) {
      const scrimmagesForGames = scrimmages.filter(({ game }) =>
        filterByGames.includes(game.toLowerCase())
      )
      return scrimmagesForGames
    } else {
      return scrimmages
    }
  }, [scrimmages, filterByGames])
  const classes = useStyles()

  const onCloseCreatescrimmage = () => {
    setOpenCreateScrimmage(false)
  }

  const onPostScrimmage = () => {
    setOpenCreateScrimmage(true)
  }

  const onSuccess = () => {
    updateScrimmages(true)
  }

  const addFilter = (game) => {
    if (filterByGames.includes(game.name.toLowerCase())) {
      setByGamesFilter(
        filterByGames.filter((name) => name !== game.name.toLowerCase())
      )
    } else {
      setByGamesFilter([...filterByGames, game.name.toLowerCase()])
    }
  }

  return (
    <Container maxWidth='xl' style={{}}>
      <Alert
        severity='info'
        style={{
          zIndex: '10',
          position: 'fixed',
          width: '300px',
          height: '50px',
          top: '50%',
          left: '50%',
          marginTop: '-25px',
          marginLeft: '-150px',
        }}
      >
        <Typography>Scrimmages coming soon !</Typography>
      </Alert>
      <Grid container style={{ filter: 'blur(4px)' }}>
        {isLoading ? (
          <div>loading</div>
        ) : (
          <>
            <Grid item xs={12}>
              <Link to='/scrimmages'>
                <Button
                  variant='outlined'
                  color='primary'
                  className={classes.link}
                  disabled={disabled}
                >
                  View my scrimmage <ChevronRightIcon />
                </Button>
              </Link>
            </Grid>
            {isCoach && (
              <Grid item xs={12}>
                <Box className={classes.createPostSection}>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={onPostScrimmage}
                    disabled={disabled}
                  >
                    Post Scrimmage
                  </Button>
                </Box>
              </Grid>
            )}
            <Grid item xs={12}>
              <Box mb={2} display='flex' flexDirection='column'>
                <Typography variant='h6'>Filter by games</Typography>
                <Box
                  display='flex'
                  flexWrap='wrap'
                  style={{ pointerEvents: disabled ? 'none' : 'auto' }}
                >
                  {allGames.map((game) => (
                    <Box
                      className={`${classes.filterContainer} ${
                        filterByGames.includes(game.name.toLowerCase())
                          ? classes.active
                          : ''
                      }`}
                      mr={1}
                      onClick={() => addFilter(game)}
                      key={game.name}
                    >
                      <Box className={classes.filterGameImageContainer} mr={2}>
                        <img
                          className={classes.imageSmall}
                          src={game.logo ? game.logo : defaultLogo}
                          alt='game'
                        />
                      </Box>
                      <Typography variant='body1'>{game.name}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
            {scrimmagesToDisplay.length > 0 ? (
              scrimmagesToDisplay.map((scrimmage) => (
                <Grid key={scrimmage._id} item xs={12}>
                  <ScrimmagePost
                    isCoach={isCoach}
                    scrimmage={scrimmage}
                    updateScrimmages={onSuccess}
                    disabled={disabled}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box mb={2} />
                <Typography variant='h5'>No scrimmages found</Typography>
              </Grid>
            )}
          </>
        )}
      </Grid>

      <Dialog open={openCreateScrimmage} onClose={onCloseCreatescrimmage}>
        <Box p={2}>
          <Box my={1}>
            <Typography variant='h5'>Make your scrimmage</Typography>
          </Box>
          <CreateScrimmagePage whenComplete={onCloseCreatescrimmage} />
        </Box>
      </Dialog>
    </Container>
  )
}
