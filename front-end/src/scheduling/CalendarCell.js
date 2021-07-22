import { Box, Typography } from '../ui'
import { makeStyles } from '@material-ui/styles'

export const CalendarCell = ({
  date,
  events = [],
  onClick,
  activeDate,
  onClickEvent = () => {},
}) => {
  const classes = useStyles()
  return date ? (
    <Box
      p={1}
      style={{
        backgroundColor: '#555',
        height: '100%',
        cursor: 'pointer',
      }}
      onClick={() => onClick(date)}
    >
      <Typography
        variant='subtitle2'
        className={activeDate ? classes.active : ''}
      >
        {date.getDate()}
      </Typography>
      {events.map((event) => (
        <Box
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onClickEvent(event)
          }}
          p={1}
          mb={1}
          style={{
            background: event.hasOwnProperty('background_color')
              ? `${event.background_color.background}`
              : '#7289da',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          {event.name}
        </Box>
      ))}
    </Box>
  ) : (
    <Box
      p={1}
      style={{
        backgroundColor: '#363636',
        height: '100%',
      }}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  active: {
    fontSize: '1.2em',
    position: 'relative',
    color: theme.palette.background.default,
    fontWeight: 600,
    width: 'fit-content',
    padding: '10px',
    zIndex: 200,
    '&:before': {
      position: 'absolute',
      content: '""',
      width: '100%',
      height: '70%',
      transform: 'translate(-28%, -8%)',
      borderRadius: '50%',
      zIndex: '-1',
      background: theme.palette.secondary.main,
    },
  },
}))
