import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../auth';
import {
    Box,
    Button,
    Container,
    TextField,
} from '../ui';

export const NewTeamInfo = () => {
    const [name, setName] = useState('');
    const [game, setGame] = useState('');
    const [description, setDescription] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const { user } = useUser();
    const history = useHistory();
    
    const onNext = async () => {
        // TODO: Send POST request to create a new school
        const newTeamId = '123'; // = await axios.post(...);
        history.push(`/onboarding/teams/${newTeamId}/players`);
    }

    return (
        <Container maxWidth="sm">
            <h1>New Team Info</h1>
            <Box mb={2}>
                <TextField
                    value={name}
                    onChange={e => setName(e.target.value)}
                    fullWidth
                    label="Team Name"
                    variant="outlined" />
            </Box>
            <Box mb={2}>
                <TextField
                    value={game}
                    onChange={e => setGame(e.target.value)}
                    fullWidth
                    label="Game"
                    variant="outlined" />
            </Box>
            <Box mb={2}>
                <TextField
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    fullWidth
                    label="Description"
                    variant="outlined" />
            </Box>
            <Button
                variant="contained">Back</Button>
            <Button
                variant="contained"
                onClick={onNext}
            >Next</Button>
        </Container>
    )
}