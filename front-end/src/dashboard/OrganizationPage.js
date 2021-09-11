import { Box, Grid, Typography, Divider } from '../ui'
import { TeamsList } from './TeamsList'
import { LeagueRecords } from '../war-room'
import { useStyles } from './Styles'
import { Member } from './Member'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useIsCoach } from '../users/useIsCoach'
import { OrganizationLogo } from './OrganizationLogo'

export const OrganizationPage = ({ user, teams, organization }) => {
  console.log(organization)
  const classes = useStyles()
  const history = useHistory()
  // check if the organization has any teams and the user is the creator then redirect to create teams page
  // otherwise we can show you are not in any team please contact your coach
  const { isCoach } = useIsCoach(organization._id)
  return (
    <Box>
      <Grid container spacing={2}>
        <Box
          style={{
            aspectRatio: '1',
            alignSelf: 'center',
            margin: 'auto 40px auto 30px',
            width: 'fit-content',
          }}
        >
          <OrganizationLogo organization={organization} isCoach={isCoach} />
        </Box>
        <Typography variant='h2' className={classes.orgName}>
          {organization && (organization.name || '')}
        </Typography>
      </Grid>
      <Box mt={2} mb={3}>
        <Divider />
      </Box>
      <Grid container spacing={2} direction='column'>
        <Grid item xs={12} sm={12}>
          <TeamsList school={organization} teams={teams} isCoach={isCoach} />
        </Grid>
        <Grid item xs={12} sm={12} mt={4} spacing={2} container direction='row'>
          <Grid item xs={12} sm={12} md={4}>
            <Box className={classes.teamsContainer}>
              <LeagueRecords
                teams={teams}
                organizationId={organization._id}
                showActions={false}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Member teams={teams || []} />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box className={classes.teamsContainer}>
              <Typography className={classes.headingMedium} variant='h5'>
                Streaming
              </Typography>
              <Box my={3}>
                <Typography>Content coming soon!</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
//Box Css
// position: relative;
// margin: 0px auto 30px;
// max-width: 600px;
// height: auto;
// background: rgb(0, 0, 0);
// background: rgba(0, 0, 0, .2);
// box-shadow: 0px 0px 20px rgb(0 0 0 / 50%);
// border: 1px solid #2a2344;
// border-radius: 10px;
// font-size: 12px;
// padding: 30px 30px 30px 50px;
