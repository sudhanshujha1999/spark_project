import React from 'react'
import { Grid, Card, Box } from '../ui'
import { useOrganizations } from '../teams'
import { useLocation } from 'react-router-dom'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

export const ChoosePlayer = () => {
  let query = useQuery()
  const selectedTeamId = query.get('team')
  console.log(selectedTeamId)
  const { organizations, isLoading: isLoadingOrganizations } =
    useOrganizations()
  console.log(organizations)

  return (
    <Box
      style={{
        margin: '30px',
      }}
    ></Box>
  )
}
