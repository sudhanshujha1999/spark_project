import React from 'react'
import { Grid, Card, BackButton, Box, Typography } from '../ui'
import { useOrganizations } from '../teams'
import { useLocation } from 'react-router-dom'
import { PlayerCard } from './PlayerCard'
import { useCurrentUserInfo } from '../users'
import { useIsCoach } from '../users/useIsCoach'
import { useHistory } from 'react-router-dom'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

export const ChoosePlayer = () => {
  const history = useHistory()
  let query = useQuery()
  const selectedTeamId = query.get('team')

  const { userInfo } = useCurrentUserInfo()
  const { _id: currentUserId } = userInfo || {}
  const { isCoach } = useIsCoach(selectedTeamId)

  const { organizations, isLoading: isLoadingOrganizations } =
    useOrganizations()
  let selectedTeam = {}
  if (!isLoadingOrganizations) {
    selectedTeam = organizations.teams.find(
      (team) => team._id === selectedTeamId
    )
  }

  return (
    <Box>
      <BackButton goBack={history.goBack} />
      <Box
        style={{
          margin: '30px',
        }}
      >
        {selectedTeam.players && selectedTeam.players.length > 0 ? (
          <Grid container spacing={4}>
            {selectedTeam.players.map(
              (
                {
                  id: playerId,
                  name: playerName,
                  gamerName: gamerName,
                  bio,
                  email,
                },
                index
              ) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={playerId}>
                  <PlayerCard
                    teamId={selectedTeamId}
                    playerId={playerId}
                    bio={bio}
                    clickable={isCoach || playerId === currentUserId}
                    playerName={playerName}
                    gamerName={gamerName}
                    email={email}
                    index={index}
                  />
                </Grid>
              )
            )}
          </Grid>
        ) : (
          <Box>
            <Typography variant='h5'>
              You haven't added any players to this roster yet
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}
