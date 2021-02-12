import { useState } from 'react';
import { COLOR_CODES as colors } from '../util/colorCodes';
import {
    AddableList,
    Box,
    Button,
    CircularProgress,
    Divider,
    TextField,
} from '../ui';
import { makeStyles } from '@material-ui/core/styles';

export const NewEventForm = ({ selectedDate, onSubmitEvent = () => {}, sending }) => {
    const [date, setDate] = useState(selectedDate);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [backgroundColor, setBackgroundColor] = useState(colors[0]);
    const [invitees, setInvitees] = useState([]);
    const classes = useStyles();
    
    return (
        <Box style={{ minWidth: 600 }}>
            <h1>New Event For {date.toLocaleDateString()}</h1>
            <Box mb={2}>
                <TextField
                    label="Event Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    variant="outlined"
                    fullWidth />
            </Box>
            <Box mb={2}>
                <TextField
                    label="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    variant="outlined"
                    fullWidth />
            </Box>
            <Box mb={2}>
                <TextField
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    label="Time"
                    variant="outlined"
                    fullWidth />
            </Box>
            <Box mb={2} className={classes.displayRow}>
                {
                    colors.map((color,i) => {
                        return(
                            <Box 
                            className={backgroundColor === color ? `${classes.active} ${classes.color}` : classes.color}
                            style={color.colorCode}
                            onClick={() => setBackgroundColor(color)}
                            component='div' />
                        )
                    })
                }
            </Box>
            <Divider />
            <Box p={2} style={{ fontWeight: 'bold' }}>
                Invite players and/or coaches:
            </Box>
            <AddableList
                items={invitees}
                onCreate={newInvitee => setInvitees([...invitees, newInvitee])}
                onRemove={index => setInvitees(invitees.slice(0, index).concat(invitees.slice(index + 1)))}
                mainButtonText="+ Invite another person or group"
                newInputText="Email address" />
            <Button
                onClick={() => onSubmitEvent({ name, date, description, time, invitees, backgroundColor })}
                color="primary"
                fullWidth
                disabled={sending}
                variant="contained"
            >
                {
                    sending ? 
                    <CircularProgress color='primary' />
                    :
                    'Create New Event'
                }
            </Button>
        </Box>
    );
}

const useStyles = makeStyles((theme) => ({
    displayRow:{
        display:'flex',
        flexFlow:'row wrap',
    },
    color:{
        borderRadius:'50%',
        height:20,
        width:20,
        cursor:'pointer',
        marginRight:'10px',
    },
    active:{
        transform:'scale(1.3)',
        position:'relative',
        '&::before':{
            position:'absolute',
            top:0,
            left:0,
            content:'""',
            width:'100%',
            height:'100%',
            border:'2px solid #eaeaea',
            borderRadius:'50%'
        }
    }
}));