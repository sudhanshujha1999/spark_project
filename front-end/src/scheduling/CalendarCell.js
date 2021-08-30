import { Box, Typography } from '../ui'
import { makeStyles } from '@material-ui/styles'
import swordsIcon from './swords.png'

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
        height: '150px',
        cursor: 'pointer',
        overflowY: 'auto',
      }}
      onClick={() => onClick(date)}
      className={
        activeDate
          ? classes.activeContainer + ' ' + classes.scrollbar
          : classes.notActiveContainer + ' ' + classes.scrollbar
      }
    >
      <Typography
        variant='subtitle2'
        className={
          activeDate ? `${classes.active} ${classes.date}` : `${classes.date}`
        }
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
          mb={1}
          className={
            event.event_type === 'WAR_ROOM' && `${classes.warroomEvent}`
          }
          style={{
            position: 'relative',
            background:
              event.event_type === 'WAR_ROOM'
                ? `linear-gradient(
              225deg
              , rgb(196, 29, 29) 0%, rgb(237, 84, 20) 100%)`
                : event.hasOwnProperty('background_color')
                ? `${event.background_color.background}`
                : '#7289da',
            borderRadius: '11px',
            boxShadow:
              'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            height: '22px',
            width: '100%',
            padding: '4px 10px 4px 10px',
            fontWeight: '500',
            fontSize: '13px',
            lineHeight: '14px',
            textAlign: 'center',
          }}
        >
          {event.event_type === 'WAR_ROOM' && (
            <img
              style={{
                position: 'absolute',
                left: '6px',
                width: '15px',
                height: '15px',
              }}
              src={swordsIcon}
            ></img>
          )}
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
  activeContainer: {
    boxShadow: '0 0 8px #ffd369',
    transition: 'box-shadow 0.3s',
    '&:hover': {
      boxShadow: '0 0 12px #ffd369',
      '& $date': {
        fontSize: '20px',
        textShadow: '-2.5px 1.5px #353b48',
      },
    },
  },
  date: {
    position: 'relative',
    transition: 'font-size 200ms, text-shadow 0.5s',
  },
  notActiveContainer: {
    boxShadow: '0 0 2px #fff',
    transition: 'box-shadow 0.3s',
    '&:hover': {
      boxShadow: '0 0 6px #fff',
      '& $date': {
        fontSize: '18px',
        textShadow: '-2.5px 1.5px #353b48',
      },
    },
  },
  active: {
    fontSize: '1.2em',
    position: 'relative',
    color: '#ffd369',
    fontWeight: 600,
    width: 'fit-content',
    padding: '0',
    zIndex: 200,
    '&:before': {
      position: 'absolute',
      content: '""',
      width: '100%',
      height: '70%',
      transform: 'translate(-28%, -8%)',
      borderRadius: '50%',
      zIndex: '-1',
      background: 'inherit',
    },
  },
  warroomEvent: {
    '&:before': {
      position: 'absolute',
      content: '""',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      border: '2px solid',
      borderColor: theme.palette.secondary.main,
      clipPath:
        'polygon(20% 0%, 100% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 100%, 0% 20%)',
      animation: '$animateClipPath 3s linear infinite alternate',
    },
  },
  '@keyframes animateClipPath': {
    '0%': {
      borderRadius: '11px',
      filter: 'hue-rotate(0deg)',
      clipPath:
        'polygon(100% 0%, 100% 0, 100% 0%, 100% 0%, 0% 100%, 0% 100%, 0 100%, 0% 100%)',
    },
    '100%': {
      filter: 'hue-rotate(180deg)',
      borderRadius: '11px',
      clipPath:
        'polygon(0% 0%, 100% 0, 100% 20%, 100% 100%, 100% 100%, 20% 100%, 0 100%, 0% 0%)',
    },
  },
  scrollbar: {
    '&::-webkit-scrollbar-track': {
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
      borderRadius: '10px',
      backgroundColor: 'inherit',
    },
    '&::-webkit-scrollbar': {
      width: '6px',
      backgroundcolor: 'inherit',
    },
    '&::-webkit-scrollbar-thumb': {
      visibility: 'hidden',
      borderRadius: '3px',
      boxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
      background: '#895cf2 ',
      // backgroundImage: -webkit-gradient('linear',
      //   'left bottom',
      //   'left top',
      //   'color-stop(0.44, rgb(122,153,217))',
      //   'color-stop(0.72, rgb(73,125,189))',
      //   'color-top(0.86, rgb(28,58,148))')
    },
    '&:hover': {
      '&::-webkit-scrollbar-thumb': {
        visibility: 'visible',
      },
    },
  },
}))
