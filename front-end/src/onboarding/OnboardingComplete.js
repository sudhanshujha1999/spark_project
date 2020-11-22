import { useHistory } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
} from '../ui';

export const OnboardingComplete = () => {
    const history = useHistory();

    const onGoToDashboard = () => {
        // TODO: Send POST request that user is onboarding
        history.push('/');
    }
    
    return (
        <Container maxWidth="sm">
            <h1>All Done!</h1>
            <Button
                onClick={onGoToDashboard}
                variant="contained"
                fullWidth
            >Go to Dashboard</Button>
        </Container>
    );
}