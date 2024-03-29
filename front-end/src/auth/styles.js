import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles((theme) => ({
  // global signup page style
  backgroundContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: '0',
    right: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '-10',
  },
  bgImage: {
    height: '100%',
    width: '100%',
    position: 'relative',
    zIndex: -4,
    '&::before': {
      position: 'absolute',
      zIndex: 0,
      zIndex: -1,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      content: "''",
      backgroundImage:
        'linear-gradient(90deg, rgba(4,4,4,0.4) 0%, rgba(7,7,7,0.6) 100%)',
    },
  },
  // sign in page heading
  heading: {
    position: 'relative',
    padding: '5px 10px',
  },
  block: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: '#eaeaea',
    animation: '$entryBlock 2s cubic-bezier(0.87, 0.29, 0.2, 0.97) forwards',
  },
  headingText: {
    opacity: 0,
    fontFamily: "'Josefin Sans'",
    fontWeight: 600,
    letterSpacing: '7px',
    animation: '$entryText 1s cubic-bezier(0.87, 0.29, 0.2, 0.97) forwards',
    animationDelay: '1s',
  },
  '@keyframes entryBlock': {
    '0%': {
      width: '0%',
      left: '0',
    },
    '50%': {
      width: '100%',
      left: '0',
    },
    '100%': {
      width: '0%',
      left: '100%',
    },
  },
  '@keyframes entryText': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
  // sign in form container
  formContainer: {
    backgroundColor: 'rgb(121 51 51 / 29%)',
    backdropFilter: 'blur(6px)',
    maxWidth: '430px',
    padding: '20px 30px',
    margin: '0 auto',
  },
  // sign in page discord btn
  discordBtn: {
    color: '#fff',
    backgroundImage: 'none',
    backgroundColor: '#5865F2',
    '&:hover': {
      backgroundColor: '#313882',
    },
  },
  // loading style
  loading: {
    display: 'grid',
    placeItems: 'center',
    minHeight: '75vh',
  },
}))
