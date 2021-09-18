import { useState } from 'react'
import { useHistory } from 'react-router'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Chip,
  CircularProgress,
  Typography,
  Tooltip,
} from '../ui'

import { ExpandMoreIcon } from '../icons'
import { useStyles } from './Styles'
import { useTeam } from '../teams'

export const EachTeamMembers = ({ team }) => {
  const classes = useStyles()
  const history = useHistory()
  const [expanded, setExpanded] = useState(false)

  console.log(team)

  const handleChange = (e, change) => {
    setExpanded(change)
  }

  const handleClick = (playerId) => {
    history.push(`/teams/${team._id}/members/${playerId}`)
  }

  return (
    <Accordion
      onChange={handleChange}
      className={
        expanded
          ? `${classes.accordion} ${classes.expanded}`
          : `${classes.accordion}`
      }
      elevation={false}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.headingAccordian}>
          {team?.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          style={{
            width: '100%',
          }}
        >
          {team.admins && (
            <Box className={`${classes.flexColumn} ${classes.coaches}`}>
              <Typography variant='h6' color='primary' gutterBottom>
                Coach
              </Typography>
              {team.admins.map((coach) => {
                return (
                  <Tooltip
                    title={coach.email}
                    style={{ cursor: 'pointer', width: 'fit-content' }}
                    onClick={() => {
                      handleClick(coach.id)
                    }}
                  >
                    <Chip
                      className={classes.coachesChip}
                      label={coach.name}
                      onDelete={
                        // !memoizedAllUserCurrentRole[index]
                        false ? () => 'do something' : null
                      }
                      color='primary'
                      variant='outlined'
                    />
                  </Tooltip>
                )
              })}
            </Box>
          )}
          {team.players && (
            <>
              <Box className={`${classes.flexColumn} ${classes.coaches}`}>
                <Typography gutterBottom color='primary' variant='h6'>
                  Players
                </Typography>
                {team.players.length > 0 ? (
                  team.players.map((player) => (
                    <Tooltip
                      title={player.email}
                      style={{ cursor: 'pointer', width: 'fit-content' }}
                      onClick={() => {
                        handleClick(player.id)
                      }}
                    >
                      <Chip
                        className={classes.playersChip}
                        label={player.name}
                        onDelete={
                          // !memoizedAllUserCurrentRole[index]
                          false ? () => 'do something' : null
                        }
                        color='primary'
                        variant='outlined'
                      />
                    </Tooltip>
                  ))
                ) : (
                  <Typography variant='body2' gutterBottom>
                    This team has no players
                  </Typography>
                )}
              </Box>
            </>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
