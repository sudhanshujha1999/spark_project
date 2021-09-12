import { Box } from './'
import { makeStyles } from '@material-ui/styles'
import { KeyboardBackspaceIcon } from '../icons'

export const BackButton = ({ goBack }) => {
  const classes = useStyles()
  return (
    <Box style={{ display: 'flex', flexDirection: 'row' }}>
      <button className={classes.button} onClick={goBack}>
        <Box className={classes.icon}>
          <KeyboardBackspaceIcon className={classes.back} />
        </Box>
        <span className={classes.backText}>Back</span>
      </button>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    backgroundColor: '#2c2c54',
    width: '100px',
    height: '40px',
    lineHeight: '40px',
    marginBottom: '20px',
    alignSelf: 'left',
    color: '#fff',
    position: 'relative',
    horizontalAlign: 'left',
    cursor: 'pointer',
    overflow: 'hidden',
    borderRadius: '5px',
    boxShadow: '0 0 10px 0 rgba(0,0,0,.3)',
    transition: 'all 0.25s cubic-bezier(0.310, -0.105, 0.430, 1.400)',
    borderColor: 'transparent',
    '&:hover': {
      opacity: '.9',
      '& $icon': {
        width: '100%',
      },
      '& $back': {
        fontSize: '35px',
        bottom: '2px',
        height: '38px',
      },
      '& $backText': {
        right: '-72%',
        opacity: 0,
      },
    },
  },
  icon: {
    display: 'block',
    height: '100%',
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    width: '28%',
    left: 0,
    transition: 'all 0.25s cubic-bezier(0.310, -0.105, 0.430, 1.400)',
  },
  back: {
    position: 'relative',
    bottom: '2px',
    fontSize: '27px',
    verticalAlign: 'middle',
    transition: `all 0.25s cubic-bezier(0.310, -0.105, 0.430, 1.400), height 0.25s ease`,
    height: '38px',
  },
  backText: {
    display: 'block',
    height: '100%',
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    width: '72%',
    lineHeight: 'inherit',
    fontSize: '18px',
    textTransform: 'uppercase',
    right: 0,
    transition: 'all 0.25s cubic-bezier(0.310, -0.105, 0.430, 1.400)',

    '&:before': {
      zIndex: '10',
      content: '',
      backgroundColor: '#a53125',
      width: '2px',
      height: '70%',
      position: 'absolute',
      top: '15%',
      left: '1px',
    },
  },
}))
