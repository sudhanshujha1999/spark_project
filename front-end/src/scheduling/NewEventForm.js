import { useState } from 'react';
import {
    AddableList,
    Box,
    Button,
    Divider,
    TextField,
} from '../ui';

export const NewEventForm = ({ selectedDate, onSubmitEvent = () => {} }) => {
    const [date, setDate] = useState(selectedDate);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [invitees, setInvitees] = useState([]);

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
                onClick={() => onSubmitEvent({ name, date, description, time, invitees })}
                color="primary"
                fullWidth
                variant="contained"
            >Create New Event</Button>
        </Box>
    );
}