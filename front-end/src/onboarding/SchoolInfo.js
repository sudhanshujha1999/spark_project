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

export const SchoolInfo = () => {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const { user } = useUser();
    const history = useHistory();
    
    const onNext = async () => {
        // TODO: Send POST request to create a new school
        const schoolId = 'abc' // = await axios.post(...);
        history.push(`/onboarding/school/${schoolId}/teams`);
    }

    const onPrevious = async () => {
        history.push('/onboarding/user-info');
    }

    return (
        <Container maxWidth="sm">
            <h1>School Info</h1>
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
                onClick={onNext}
                variant="contained"
            >Next</Button>
        </Container>
    )
}