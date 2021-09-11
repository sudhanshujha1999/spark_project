import { makeStyles } from '@material-ui/styles'
import blue from '@material-ui/core/colors/blue'
import teamPic from '../img/teamPic.jpg'
const bezierValue = 'cubic-bezier(0.26, 1, 0.43, 0.93)'

export const useStyles = makeStyles((theme) => ({
  // CARD STYLES
  cardStyles: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    height: '200px',
    position: 'relative',
    cursor: 'pointer',
    padding: '10px',
  },
  cardActions: {
    position: 'absolute',
    top: 10,
    right: 10,
    display: 'flex',
    flexFlow: 'row',
  },
  textfield: {
    pointerEvents: 'none',
  },
  // INPUT WHEN DISABLED
  input: {
    fontSize: 'min(4vw,1.5em)',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  btn: {
    zIndex: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 50,
    right: 50,
  },
  // NEW TEAM CARD
  teamCard: {
    // margin: "0 auto",
    position: 'relative',
    zIndex: '10',
    width: '200px',
    cursor: 'pointer',
    '&:hover': {
      zIndex: '15',
      '& $background': {
        transition: `all 250ms ${bezierValue}`,
        transform: 'scale(1.2)',
        opacity: 1,
      },
      '& $teamImg': {
        boxShadow: '0px 5px 10px rgba(0,0,0,0.3)',
      },
      '& $rank': {
        top: '-11%',
        right: '-7%',
        backgroundColor: 'rgba(0,0,0,0.6)',
      },
      '& $front': {
        transform: 'translateY(-30%) scale(0.78)',
        '& $teamName': {
          // color: "red",
          transform: 'scale(1.2)',
          animation: '$animateName 250ms linear forwards',
        },
      },
      '& $iconBtn': {
        opacity: 1,
        transition: `all 250ms ${bezierValue}`,
      },
      '& $back': {
        opacity: 1,
        transition: `all 250ms ${bezierValue}`,
      },
    },
  },
  rank: {
    position: 'absolute',
    padding: '15px 10px',
    clipPath: ' polygon(100% 0%, 100% 100%, 50% 81%, 0 100%, 0 0)',
    backgroundColor: 'rgba(0,0,0,0.8)',
    color: '#fafafa',
    top: '-1px',
    right: '15%',
    zIndex: '5',
    fontSize: '1.1em',
    fontWeight: 600,
    transition: `all 250ms ${bezierValue}`,
  },
  front: {
    zIndex: '5',
    transition: `all 250ms ${bezierValue}`,
  },
  teamImg: {
    zIndex: '5',
    width: '100%',
    height: '250px',
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0)',
  },
  teamName: {
    position: 'relative',
    zIndex: '5',
    margin: '10px 0',
    fontSize: '1.3em',
    color: '#fff',
    textAlign: 'left',
    opacity: 1,
  },
  '@keyframes animateName': {
    '0%': {
      opacity: '0',
      textAlign: 'left',
    },
    '40%': {
      opacity: '0',
      textAlign: 'left',
    },
    '50%': {
      opacity: '0',
      textAlign: 'center',
    },
    '100%': {
      marginTop: 20,
      opacity: '1',
      textAlign: 'center',
      fontSize: '1.2em',
      color: blue[400],
      fontWeight: 600,
    },
  },
  iconBtn: {
    opacity: 0,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: '-3px',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
      transform: 'scale(1.1) translateY(-49%)',
      '& $btnIcon': {
        color: theme.palette.secondary.main,
        transform: 'rotate(175deg)',
      },
    },
  },
  btnIcon: {
    transition: 'all 500ms ease-in',
  },
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    borderRadius: '10px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0px 10px 10px rgba(0,0,0,0.4)',
    zIndex: '-1',
    transform: 'scale(0.2,0.8)',
    opacity: '0',
  },
  back: {
    opacity: 0,
    position: 'absolute',
    width: '100%',
    top: '70%',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  gameName: {
    fontSize: '1.4em',
    fontWeight: 700,
    textAlign: 'center',
  },
  teamCardBtn: {
    marginTop: '50px',
    borderRadius: '20px',
    '&:hover': {
      boxShadow: '0px 5px 10px rgba(0,0,0,0.4)',
    },
  },
  // PLAYER CARD
  playerCardConatiner: {
    maxWidth: '200px',
    height: '250px',
    position: 'relative',
    '&:hover': {
      '& $playerCard': {
        boxShadow: '0px 5px 15px 2px rgba(255,255,255,0.2)',
      },
    },
  },
  playerCard: {
    display: 'flex',
    flexFlow: 'column',
    position: 'relative',
    zIndex: '3',
    height: '100%',
    margin: '10px auto',
    backgroundColor: '#303030',
    padding: '5px 10px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.4)',
    cursor: 'pointer',
    transition: 'all .2s ease-in',
  },
  gradient: {
    position: 'absolute',
    maxWidth: '290px',
    content: '""',
    top: '50%',
    borderRadius: '5px',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: '102%',
    height: '102%',
    zIndex: '-100',
    backgroundImage:
      'linear-gradient(460deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)',
    backgroundSize: '300%',
    backgroundPosition: 'right',
    animation: '$animate 20s infinite alternate',
  },
  '@keyframes animate': {
    '0%': {
      backgroundPosition: 'right',
    },
    '25%': {
      backgroundPosition: 'bottom',
    },
    '50%': {
      backgroundPosition: 'left',
    },
    '100%': {
      backgroundPosition: 'top',
    },
  },
  breakWord: {
    wordWrap: 'break-word',
    width: '90%',
  },
  teamImage: {
    position: 'absolute',
    top: '-30px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '50px',
    height: '50px',
    zIndex: '200',
    borderRadius: '50%',
    backgroundImage: `url(${teamPic})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    boxShadow: '0px 5px 10px 2px rgba(0,0,0,0.2)',
  },
  playerName: {
    marginTop: '20px',
  },

  //goal styles

  goalsContainer: {
    margin: '20px 0',
    maxHeight: '500px',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    overflowY: 'auto',
    padding: '20px',
    backdropFilter: 'blur(6px)',
    backgroundColor: 'rgb(28 32 36 / 60%)',
  },
  customScrollX: {
    '&::-webkit-scrollbar-track': {
      width: '100px',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
      borderRadius: '1px',
      backgroundColor: 'inherit',
    },
    '&::-webkit-scrollbar': {
      height: '2px',
      backgroundcolor: 'inherit',
    },
    '&::-webkit-scrollbar-thumb': {
      visibility: 'hidden',
      borderRadius: '1px',
      boxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
      backgroundColor: theme.palette.secondary.main,
    },
    '&:hover': {
      '&::-webkit-scrollbar-thumb': {
        visibility: 'visible',
      },
    },
  },
  customScrollY: {
    '&::-webkit-scrollbar': {
      width: '4px',
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: '2px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '2px',
      boxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
      backgroundColor: theme.palette.secondary.main,
    },
  },
  eventsContainer: {
    display: 'flex',
    flexFlow: 'row no-wrap',
    width: '100%',
    overflowX: 'auto',
    padding: '10px 10px',
  },
  container: {
    position: 'relative',
    padding: '15px 10px',
    borderRadius: 5,
    width: '400px',
    height: '220px',
    cursor: 'pointer',
    backgroundColor: 'rgb(13 13 19 / 40%)',
    border: `1px solid ${theme.palette.background.paper}`,
    transition: 'background-color 1000ms linear',
    WebkitTransition: 'background-color 300ms linear',
    boxShadow: '0px 0px 1px 0px #fff',
    overflow: 'hidden',
    '&:hover': {
      backgroundColor: 'rgb(13 13 19 / 70%)',
      // boxShadow: '0px 0px 2px 0px #fff',
      '& $vs': {
        '&:nth-child(1)': {
          transform: 'translateY(-10px)',
          '&::before': {
            top: '20%',
            height: '200%',
          },
        },
        '&:nth-child(2)': {
          transform: 'translateY(10px)',
        },
      },
    },
  },

  goalbox: {
    position: 'relative',
    zIndex: '10',
    width: '98%',
    zIndex: '15',
    margin: '10px 0',
    backgroundColor: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    '&:hover': {
      transition: `all 500ms ${bezierValue}`,
      transform: 'scale(1.01)',
      '& $goalCardImg': {
        boxShadow: '0px 5px 10px rgba(0,0,0,0.3)',
        transition: `all 500ms ${bezierValue}`,
        transform: 'scale(1.05)',
      },
    },
  },
  goalCardImg: {
    zIndex: '5',
    position: 'relative',
    top: '0%',
    width: '200px',
    height: '250px',
    alignSelf: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    borderRadius: '10px',
    boxShadow: '0px 3px 10px rgba(0,0,0,0.2)',
  },
  goalCardGameName: {
    position: 'relative',
    zIndex: '5',
    margin: '10px 0',
    fontSize: '1.3em',
    background:
      'linear-gradient( to right, #f32170, #ff6b08, #cf23cf, #eedd44)',
    '-webkit-text-fill-color': 'transparent',
    '-webkit-background-clip': 'text',
    opacity: 1,
    textAlign: 'center',
  },
  goalCardGoalName: {
    background: 'linear-gradient(60deg, #2e86de, #ff9f43)',
    '-webkit-text-fill-color': 'transparent',
    '-webkit-background-clip': 'text',
  },
  goalCardPlayerName: {
    position: 'relative',
    zIndex: '5',
    margin: '10px 0',
    fontSize: '1.3em',
    color: '#fff',
    textAlign: 'left',
    opacity: 1,
    textAlign: 'center',

    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },

  //goal page styles

  goalName: {
    position: 'relative',
    width: 'fit-content',
    fontSize: '45px',
  },

  headingMedium: {
    fontSize: '2em',
    width: 'fit-content',
    position: 'relative',
    '&:before': {
      position: 'absolute',
      content: '""',
      width: '150%',
      height: '3px',
      bottom: '-6px',
      left: 0,
      borderRadius: '0px 5px 5px 15px',
      zIndex: '2',
      background:
        'linear-gradient(90deg, rgba(213,105,255,1) 0%, rgba(68,161,240,1) 30%, rgba(250,250,250,0) 60%)',
    },
  },

  goalText: {
    position: 'relative',
    fontSize: '1.3em',
    margin: '1em',
  },

  //goal page- color picker

  swatch: {
    width: '30px',
    maxWidth: '30px',
    zIndex: '3',
    height: '30px',
    borderRadius: '50%',

    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer',
  },
  popover: {
    opacity: 1,
    position: 'relative',
    right: '275px',
    padding: '20px',
    width: '300px',
    height: '100px',
    zIndex: '2',
    background: '#2f3640',
    borderRadius: '10px',
    border: '1px solid #fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cover: {
    position: 'relative',
    width: '80%',
    height: '80%',
  },

  //goal page - data modal

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: '400px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #fff',
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  //goal-page show data

  datasContainer: {
    width: '100%',
    opacity: '0.8',
    padding: '30px',
    borderRadius: '0',
  },

  dataContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    margin: '10px',
    alignItems: 'center',
    border: '1px solid #895cf2',
    borderRadius: '0',
    padding: '10px 20px',
    transition: 'box-shadow .3s',
    '&:hover': {
      boxShadow: '0 0 8px #ffd369',
    },
  },

  dataDeleteButton: {
    transition: 'box-shadow .3s',
    '&:hover': {
      boxShadow: '0 0 2px #e84118',
    },
  },

  dialog: {
    padding: '20px 50px',
  },
}))
