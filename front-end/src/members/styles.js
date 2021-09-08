import { makeStyles } from '@material-ui/styles'
// import background from "../img/background.jpg";
import background from '../img/bg-2.svg'

export const useStyles = makeStyles((theme) => ({
  background: {
    width: '110vw',
    top: 0,
    left: 0,
    height: '110vh',
    position: 'fixed',
    zIndex: '-100000',
    opacity: '0.8',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
  },
  profileDetails: {
    display: 'flex',
    flexFlow: 'column',
    margin: '20px auto',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: 200,
    width: 200,
  },
  uploadBtn: {
    backgroundColor: theme.palette.background.default,
    '&:hover': {
      backgroundColor: '#1c1c1c',
    },
  },
  icon: {
    fontSize: 200,
    fill: theme.palette.background.default,
    borderRadius: '50%',
  },
  detailsContent: {
    marginTop: '30px',
  },
  name: {
    textAlign: 'center',
    fontSize: 'min(4em, 7vw)',
  },
  gamerName: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(3),
    '&>h3': {
      marginLeft: '10px',
      textAlign: 'center',
      fontSize: 'min(1.5em, 4vw)',
    },
    '&>h6': {
      marginLeft: '10px',
      textAlign: 'center',
      fontSize: 'min(1.3em, 3.4vw)',
    },
  },
  discordBtn: {
    color: '#fff',
    '&:hover': {
      color: '#5865F2',
    },
  },
  classOfBtn: {
    padding: '3px 8px',
    fontSize: '1.0em',
    margin: '0 0 0.35em 0.3em',
    color: '#c7ecee',
    height: '37px',
    '&:hover': {
      color: 'rgb(17, 82, 147)',
    },
    '&:disabled': {
      color: '#c7ecee',
    },
  },
  gridItem: {
    padding: '10px',
  },
  sectionHeading: {
    display: 'flex',
    flexFlow: 'row',
    marginBottom: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    '&>p': {
      fontSize: 'min(2em, 5vw)',
      marginLeft: '15px',
    },
    '&::before': {
      position: 'absolute',
      content: '""',
      bottom: '-3px',
      width: '30%',
      height: '3px',
      borderRadius: '0 50% 0 50%',
      backgroundColor: theme.palette.primary.main,
    },
  },
  //overview
  bioTextBox: {
    padding: '10px',
    backgroundColor: 'inherit',
    width: 'min(500px, 100%)',
    borderRadius: '4px',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },
  multiLineTextField: {
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
    },
    '&:hover': {
      '&::-webkit-scrollbar-thumb': {
        visibility: 'visible',
      },
    },
  },
  infoMessage: {
    padding: '5px',
    color: theme.palette.warning.main,
    background: 'rgba(0,0,0,0.4)',
    borderRadius: 5,
    display: 'block',
    marginTop: 5,
    marginLeft: 15,
    width: 'fit-content',
  },

  userBio: {
    borderRadius: '5px',
    border: '1px solid rgba(200,200,200,0.2)',
    backgroundColor: '#1a1c21',
  },
  sectionBio: {
    justifyContent: 'space-between',
  },
  textCenter: {
    textAlign: 'center',
  },
  noGames: {
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    '&>p': {
      fontSize: 'min(1.2em, 5vw)',
      marginLeft: '15px',
      color: '#8b8c8d',
    },
    '&>svg': {
      fill: '#8b8c8d',
    },
  },
  load: {
    height: '200px',
    display: 'grid',
    placeItems: 'center',
  },
  savingImage: {
    height: 200,
    width: 200,
    display: 'grid',
    placeItems: 'center',
  },
  speedDial: {
    transform: 'translateX(70px)',
  },
  fab: {
    height: 45,
    width: 45,
  },
  // NOTES
  note: {
    padding: '10px 20px',
    marginBottom: '15px',
    boxShadow: '0px 5px 5px rgba(0,0,0,0.2)',
  },

  //twitch

  twitchSpeedDial: {
    position: 'relative',
    width: '16px',
    height: '16px',
    borderRadius: '0px',
    top: '-2px',
    left: '-6px',
  },

  twitchModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  twitchPaper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    maxWidth: '90%',
    maxHeight: '500px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
    boxShadow: '0 0px 3px #130f40',
    padding: theme.spacing(2, 4, 3),
  },
}))
