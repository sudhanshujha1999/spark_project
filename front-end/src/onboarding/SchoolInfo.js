import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../auth';
import {
    Alert,
    Box,
    Button,
    Container,
    CircularProgress,
    TextField,
} from '../ui';

export const SchoolInfo = () => {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');

    const { user } = useUser();
    const history = useHistory();

    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState('');
    
    const onNext = async () => {
        setIsUpdating(true);
        try {
            const authtoken = await user.getIdToken();
            const response = await axios.post(`/api/schools`, { name, city }, { headers: { authtoken } });
            const schoolId = response.data;
            history.push(`/onboarding/school/${schoolId}/teams`);
        } catch (e) {
            setIsUpdating(false);
            setError(e.message);
        }
    }

    const onPrevious = async () => {
        history.push('/onboarding/user-info');
    }

    return (
        <Container maxWidth="sm">
            <h1>School Info</h1>
            <Box mb={2}>
                {error && <Alert severity="error">{error}</Alert>}
            </Box>
            <Box mb={2}>
                <TextField
                    value={name}
                    onChange={e => setName(e.target.value)}
                    fullWidth
                    label="Full Name"
                    variant="outlined" />
            </Box>
            <Box mb={2}>
                <TextField
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    fullWidth
                    label="City"
                    variant="outlined" />
            </Box>
            <Button
                onClick={onPrevious}
                variant="contained"
            >Back</Button>
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