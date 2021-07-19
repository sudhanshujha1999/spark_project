import { Switch, Route } from 'react-router-dom'
import { OnboardingRoute, PrivateRoute } from './routing'
import { Box, NavBar, SideNav } from './ui'
import * as routeDefinitions from './routeDefinitions'
import { useCurrentUserInfo } from './users'
import { makeStyles } from '@material-ui/styles'
import background from './img/bg-2.svg'

const routes = Object.values(routeDefinitions)

export const Routes = () => {
  const classes = useStyles()
  const { userInfo } = useCurrentUserInfo()
  return (
    <Switch>
      {routes.map((route, i) => {
        const RouteType = route.isPublic
          ? Route
          : route.isOnboarding
          ? OnboardingRoute
          : PrivateRoute

        return (
          <RouteType key={i} path={route.path} exact>
            <NavBar />
            {(!route.hideNav || (userInfo && userInfo.isOnboarded)) && (
              <SideNav />
            )}
            <Box className={classes.background} />
            <Box
              ml={route.hideNav ? 0 : '64px'}
              mt={'64px'}
              p={route.hideNav ? 0 : 4}
            >
              <route.component />
            </Box>
          </RouteType>
        )
      })}
    </Switch>
  )
}

const useStyles = makeStyles((theme) => ({
  background: {
    width: '110vw',
    height: '110vh',
    position: 'fixed',
    zIndex: '-100000',
    opacity: '0.8',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
  },
}))
