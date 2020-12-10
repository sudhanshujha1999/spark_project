import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../auth';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
} from '../ui';

export const NewTeamInfo = () => {
    const [name, setName] = useState('');
    const [game, setGame] = useState('');
    const [description, setDescription] = useState('');

    const { user } = useUser();
    const history = useHistory();
    const { schoolId } = useParams();

    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState('');
    
    const onNext = async () => {
        setIsUpdating(true);
        try {
            const authtoken = await user.getIdToken();
            const response = await axios.post('/api/teams', { name, game, description, schoolId }, { headers: { authtoken } });
            const newTeamId = response.data;
            history.push(`/onboarding/schools/${schoolId}/teams/${newTeamId}/players`);
        } catch (e) {
            setIsUpdating(false);
            setError(e.message);
        }
    }

    return (
        <Container maxWidth="sm">
            <h1>New Team Info</h1>
            <Box mb={2}>
                {error && <Alert severity="error">{error}</Alert>}
            </Box>
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
            >
                {isUpdating
                    ? <CircularProgress size={24} />
                    : 'Next'}
            </Button>
        </Container>
    )
}