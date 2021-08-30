import { Box, Typography, Button } from '../ui'
import SparkLogo from '../img/logo.svg'
import { useStyles } from './styles'

export const HeadingContent = ({ nextStep }) => {
  const classes = useStyles()
  return (
    <Box className={classes.headingContainer}>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Box mr={2}>
          <img className={classes.logo} alt='Spark Logo' src={SparkLogo} />
        </Box>
        <Box mr={2}>
          <Typography className={classes.orgName}>
            <span
              style={{ clipPath: 'polygon(0 0,100% 0,100 45%,0 55%)' }}
              className={classes.orgNameFirstSpan}
              aria-hidden='true'
            >
              SPARK
            </span>
            SPARK
            <span
              style={{ clipPath: 'polygon(0 75%,100% 55%,100 100%,0 100%)' }}
              className={classes.orgNameSecondSpan}
              aria-hidden='true'
            >
              SPARK
            </span>
          </Typography>
        </Box>
      </Box>
      <Typography className={classes.body} variant='body2' gutterBottom>
        Player developement and team management platform to help you{' '}
        <strong className={classes.nameOrg}> Win.</strong>
      </Typography>
      <Button
        disableElevation
        className={classes.btn}
        variant='contained'
        color='secondary'
        onClick={() => nextStep()}
      >
        Request Invite
      </Button>
    </Box>
  )
}
