import { makeStyles } from '@material-ui/styles'
import purple from '@material-ui/core/colors/purple'
import red from '@material-ui/core/colors/red'

export const useStyles = makeStyles((theme) => ({
  load: {
    display: 'grid',
    placeItems: 'center',
    height: '60vh',
  },
  contentContainer: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'column',
    padding: '10px 20px',
  },
  org: {
    position: 'absolute',
    transform: 'rotate(-90deg)',
    bottom: '22%',
    left: '-21%',
    zIndex: '5',
    fontSize: '2em',
    color: '#ffd369',
    textTransform: 'uppercase',
  },
  teamName: {
    padding: '10px 20px',
    width: 'fit-content',
    clipPath: 'polygon(15% 0, 100% 0, 100% 50%, 85% 100%, 0 100%, 0% 50%)',
    border: '2px solid',
    borderRadius: '5px',
    borderColor: purple[600],
    fontSize: '2em',
    marginBottom: 30,
  },
  gamesContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  game: {
    padding: '10px 20px',
    marginRight: '20px',
    marginTop: '15px',
    cursor: 'pointer',
    fontSize: '1.2em',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    boxShadow: '0px 3px 10px 1px rgba(0,0,0,0.2)',
    backgroundImage:
      'linear-gradient(460deg, #552ec3, #7249dd, #7f49dd, #a166ab, #5073b8, #393e46, #393e46, #393e46)',
    backgroundSize: '400%',
    backgroundPosition: 'right',
    '&:hover': {
      boxShadow: '0px 3px 10px 1px rgba(255,255,255,0.2)',
    },
  },
  active: {
    transition: '1s all ease-in',
    backgroundPosition: 'left',
  },
  imageContainer: {
    width: '320px',
    height: '410px',
    position: 'relative',
  },
  imgChangeButton: {
    position: 'absolute',
    width: '50px',
    height: '50px',
    bottom: '-20px',
    right: '-20px',
    transform: 'rotate(-20deg)',
    filter: 'drop-shadow(0 15px 10px rgba(0,0,0,0.5))',
    background: '#ffd369',
    '&:hover': {
      background: '#cba956',
    },
  },
  img: {
    width: '100%',
    zIndex: '5',
    height: '100%',
    // backgroundColor: "#333",
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    borderRadius: '10px',
    // boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
  },
  controller: {
    position: 'absolute',
    width: '150px',
    bottom: '-10px',
    left: 250,
    transform: 'rotate(-20deg)',
    filter: 'drop-shadow(0 15px 10px rgba(0,0,0,0.5))',
  },
  // PERMISSIONS CHECKBOX
  permissions: {
    padding: 10,
    marginTop: '20px',
    border: '1px solid rgba(250,250,250,0.2)',
    borderRadius: '5px',
    position: 'relative',
    '&:before': {
      position: 'absolute',
      content: "'Permission'",
      top: '-10px',
      left: 10,
      padding: '0 5px',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.secondary.main,
    },
  },
  deleteBtn: {
    marginRight: 20,
    color: '#fafafa',
    backgroundColor: red[400],
    '&:hover': {
      backgroundColor: red[600],
    },
  },
  checkbox: {
    flexBasis: '47%',
  },
}))
