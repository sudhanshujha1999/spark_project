import React from 'react'
import { Grid, Card, Box } from '../ui'
import { useOrganizations } from '../teams'
import { TeamsList } from './TeamList'
import { useIsCoach } from '../users/useIsCoach'

export const ChooseTeam = () => {
  const { organizations, isLoading: isLoadingOrganizations } =
    useOrganizations()
  const { isCoach } = useIsCoach(organizations._id)

  console.log(organizations.teams)

  return (
    <Box
      style={{
        margin: '30px',
      }}
    >
      <TeamsList
        school={organizations}
        teams={organizations.teams}
        isCoach={isCoach}
      />
    </Box>
  )
}
