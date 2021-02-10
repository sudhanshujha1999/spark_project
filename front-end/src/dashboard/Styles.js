import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    // CARD STYLES
    cardStyles:{
        display: 'flex',
        flexFlow:'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        height: '200px',
        position: 'relative',
    },
    cardActions:{
        position:'absolute',
        top:10,
        right:10,
        display:'flex',
        flexFlow:'row',
    },
    // INPUT WHEN DISABLED
    input:{
        fontSize:'min(4vw,1.5em)',
        color:'white',
        textAlign:'center',
        fontWeight:'bold',
    },
}));