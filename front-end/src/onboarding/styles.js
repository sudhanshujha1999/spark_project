import { makeStyles } from '@material-ui/styles'
import purple from '@material-ui/core/colors/purple'

export const useStyles = makeStyles((theme) => ({
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
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: '-13%',
      right: '-18%',
      width: '70%',
      height: '70%',
      zIndex: '-5',
      backgroundImage:
        'linear-gradient(126deg, rgba(69,44,141,1) 0%, rgba(18,26,48,1) 100%)',
    },
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

  // USER INFO
  infoContainer: {
    borderTop: '2px solid #eaeaea',
    paddingTop: 20,
    marginTop: 10,
  },
  profileBox: {
    height: '250px',
    width: '90%',
    margin: '0 auto',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    clipPath: 'polygon(0 0, 100% 0%, 100% 80%, 50% 100%, 0 80%)',
    marginTop: '-20px',
    '& > span': {
      textAlign: 'center',
    },
  },
  profileWithImageBox: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    transition: 'all 0.2s ease-out',
    position: 'relative',
    opacity: 1,
    overflow: 'visible',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transform: 'translateY(-100%)',
      zIndex: '-5',
      opacity: '0.4',
      clipPath: 'polygon(0 0, 100% 0%, 100% 80%, 50% 100%, 0 80%)',
      transition: `all 0.5s cubic-bezier(0.26, 1, 0.43, 0.93)`,
      backgroundImage:
        'linear-gradient(126deg, rgba(9,4,41,1) 0%, rgba(8,6,8,1) 100%)',
    },
    '&:hover': {
      '&::before': {
        transform: 'translateX(0%)',
      },
      '& $editBtn': {
        transform: 'scale(1) translate(3%, -80%)',
        opacity: 1,
      },
    },
  },
  editBtn: {
    position: 'absolute',
    top: '50%',
    '& > span': {
      textTransform: 'capitalize',
    },
    transform: 'scale(0.7) translate(3%, -40%) ',
    opacity: 0,
    transition: `all 0.5s cubic-bezier(0.26, 1, 0.43, 0.93)`,
  },
}))
