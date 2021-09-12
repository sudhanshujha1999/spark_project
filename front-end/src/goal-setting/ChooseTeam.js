import React, { useState } from 'react'
import { Grid, Card, Box, BackButton, Alert, Collapse, IconButton } from '../ui'
import CloseIcon from '@material-ui/icons/Close'
import { useOrganizations } from '../teams'
import { TeamsList } from './TeamList'
import { useIsCoach } from '../users/useIsCoach'
import { useHistory } from 'react-router-dom'

export const ChooseTeam = () => {
  const history = useHistory()
  const { organizations, isLoading: isLoadingOrganizations } =
    useOrganizations()
  const [showAlert, setShowAlert] = useState({ type: '', message: '' })
  const { isCoach } = useIsCoach(organizations._id)

  return (
    <Box>
      <BackButton goBack={history.goBack} />
      <Box
        style={{
          margin: '10px',
        }}
      >
        {showAlert.type && (
          <Collapse in={Boolean(showAlert)} timeout='auto' unmountOnExit={true}>
            <Alert
              variant='outlined'
              severity={showAlert.type}
              style={{
                borderRadius: '10px',
                margin: '0 10% 10px 10%',
                textAlign: 'center',
              }}
              action={
                <IconButton
                  aria-label='close'
                  color='inherit'
                  size='small'
                  onClick={() => {
                    setShowAlert({})
                  }}
                >
                  <CloseIcon fontSize='inherit' />
                </IconButton>
              }
            >
              {showAlert.message}
            </Alert>
          </Collapse>
        )}
        <TeamsList
          school={organizations}
          teams={organizations.teams}
          isCoach={isCoach}
          setShowAlert={setShowAlert}
        />
      </Box>
    </Box>
  )
}
