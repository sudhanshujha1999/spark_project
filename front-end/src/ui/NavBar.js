import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import { Icon, Typography } from './'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import SparkLogo from '../img/logo.svg'
import { useCurrentUser, SignOutButton } from '../auth'
import { useLoadNotifications, NotificationsButton } from '../notifications'

export const NavBar = () => {
  const classes = useStyles()
  const { isLoading, user: currentUser } = useCurrentUser()

  useLoadNotifications();

  return (
    <AppBar
      backgroundColor='#304964'
      swid='nav-bar'
      position='fixed'
      className={classes.appBar}
      p={2}
    >
      <Toolbar>
        <Box className={classes.logo} style={{ flex: 10 }}>
          {!currentUser && (
            <>
              <Icon fontSize='large'>
                <img
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  alt='Spark Logo'
                  src={SparkLogo}
                />
              </Icon>
              <Typography className={classes.logoName}>
                SPARK ESPORTS
              </Typography>
            </>
          )}
        </Box>
        <Box>
          {!isLoading && currentUser ? (
            <Box
              style={{
                display: 'flex',
                flexFlow: 'row',
                alignItems: 'center',
              }}
            >
              <p>Logged in as {currentUser.email}</p>
			  <NotificationsButton />
              <Box ml={2}>
                <SignOutButton variant='outlined' />
              </Box>
            </Box>
          ) : (
            <Link to='/sign-in'>
              <Button variant='outlined'>Sign In</Button>
            </Link>
          )}{' '}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: 500,
    opacity: 0.4,
    transition: 'all 0.2s ease-out',
    backgroundColor: 'rgba(34,40,49,0.5)',
    '&:hover': {
      opacity: 1,
      backgroundColor: 'rgba(34,40,49,1)',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    cursor: 'pointer',
    width: 'fit-content',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    filter: 'grayscale(1)',
  },
  logoName: {
    margin: '4px 0px 0px 18px',
    letterSpacing: 2,
    fontSize: '1.3em',
    fontWeight: 700,
    fontFamily: "'Josefin Sans'",
    color: '#fafafa',
  },
  title: {
    flexGrow: 1,
  },
}))
