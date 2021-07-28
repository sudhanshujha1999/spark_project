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
    flexFlow: 'column',
    alignItems: 'center',
  },
  gameName: {
    fontSize: '1.4em',
    fontWeight: 700,
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

  goalCard: {
    position: 'relative',
    zIndex: '10',
    width: '300px',
    zIndex: '15',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '10px',
    '&:hover': {
      transition: `all 500ms ${bezierValue}`,
      transform: 'scale(1.05)',
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
    top: '10%',
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
    color: '#fff',
    textAlign: 'left',
    opacity: 1,
    textAlign: 'center',
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
  },

  //goal page styles

  goalName: {
    position: 'relative',
    width: 'fit-content',
    '&:before': {
      position: 'absolute',
      content: '""',
      width: '110%',
      height: '110%',
      top: '-5%',
      left: '-5%',
      borderRadius: '1px',
      border: '2px solid',
      borderColor: theme.palette.secondary.main,
      clipPath:
        'polygon(20% 0%, 100% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 100%, 0% 20%)',
      animation: '$animateClipPath 7s linear infinite alternate',
    },
  },
  '@keyframes animateClipPath': {
    '0%': {
      borderRadius: '1px',
      filter: 'hue-rotate(0deg)',
      clipPath:
        'polygon(100% 0%, 100% 0, 100% 0%, 100% 0%, 0% 100%, 0% 100%, 0 100%, 0% 100%)',
    },
    '100%': {
      filter: 'hue-rotate(180deg)',
      borderRadius: '10px',
      clipPath:
        'polygon(20% 0%, 100% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 100%, 0% 20%)',
    },
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
    fontSize: '1.5em',
    margin: '1em',
  },

  dialog: {
    padding: '20px 50px',
  },
}))
