import { useParams, Prompt } from 'react-router-dom'
import { SaveIcon } from '../icons'
import { post } from '../network'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Fade,
  Typography,
} from '../ui'
import { useGetMatch } from './useGetMatch'
import { useStyles } from './styles'
import { MatchRoom } from './MatchRoom'
import { useState } from 'react'
import { useOrganizations } from '../teams'
import { useIsCoach } from '../users/useIsCoach'
import { MatchInformation } from './MatchInformation'
import { useRecoilValue } from 'recoil'
import { pathsState, variableDataState } from './recoilState'
import { DeleteMatch } from './DeleteMatch'

export const MatchDetails = () => {
  const { matchId } = useParams()
  const { organizations } = useOrganizations()
  const { isCoach } = useIsCoach(organizations._id)
  const { match, isLoading } = useGetMatch(matchId)
  const [startMatch, setStartMatch] = useState(false)
  const [isChanged, setIsChanged] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteMatch, setDeleteMatch] = useState(false)
  const classes = useStyles()
  const allStages = useRecoilValue(pathsState)
  const changedData = useRecoilValue(variableDataState)
  const toggleMatch = () => {
    setStartMatch(!startMatch)
  }
  const endMatch = async () => {
    setSaving(true)
    console.log(changedData)
    const values = { ...changedData, stages: allStages }
    try {
      await post(`/api/${match.match._id}/save/match`, values)
    } catch (error) {
      console.log(error)
    }
    setSaving(false)
    setIsChanged(false)
  }

  console.log(match)

  // const deleteMatch = async () => {}

  return (
    <Container maxWidth='xl'>
      {/* LOADING PART COMMENTED UNTIL THE BACKEND IS MADE */}
      {isLoading ? (
        <Box className={classes.loading}>
          <CircularProgress color='secondary' />
        </Box>
      ) : match ? (
        <Box>
          <MatchInformation
            isCoach={isCoach}
            match={match}
            startMatch={startMatch}
            toggleMatch={toggleMatch}
            hasChanged={isChanged}
            setHasChanged={setIsChanged}
          />
          {startMatch &&
            (match.match.maps.length > 0 ? (
              <MatchRoom
                isCoach={isCoach}
                hasChanged={isChanged}
                setHasChanged={setIsChanged}
                match={match}
                startMatch={startMatch}
                toggleMatch={toggleMatch}
                maps={match.match.maps}
              />
            ) : (
              <Typography style={{ textAlign: 'center', marginBottom: '30px' }}>
                No maps added for this game yet. stay tuned.
              </Typography>
            ))}
          {isCoach && (
            <Fade in={!deleteMatch} mb={2}>
              <Box>
                <Box my={5} />
                <Button
                  variant='contained'
                  color='primary'
                  style={{
                    background: 'linear-gradient(to right, #e43a15, #e65245)',
                    '-webkit-text-fill-color': 'transparent',
                    '-webkit-background-clip': 'text',
                    border: '1px solid #ff3f34',
                  }}
                  onClick={() => setDeleteMatch(true)}
                >
                  Delete Match
                </Button>
              </Box>
            </Fade>
          )}
          {deleteMatch && (
            <DeleteMatch
              open={deleteMatch}
              setDeleteMatch={setDeleteMatch}
              eventId={match._id}
            />
          )}
          {isCoach && isChanged && (
            <Button
              color='secondary'
              variant='contained'
              className={classes.saveBtn}
              endIcon={<SaveIcon />}
              disabled={saving}
              onClick={endMatch}
            >
              {saving ? (
                <CircularProgress color='secondary' size='2em' />
              ) : (
                'save session'
              )}
            </Button>
          )}
        </Box>
      ) : (
        <Box className={classes.loading}>
          <Typography variant='h4'>No valid Match found!!</Typography>
        </Box>
      )}
      <Prompt
        message='You have unsaved progress please save them, otherwise they will be lost'
        when={isChanged}
      />
    </Container>
  )
}
