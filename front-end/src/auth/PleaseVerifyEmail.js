import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Alert,
    Button,
    Container,
    Typography,
} from '../ui';

export const PleaseVerifyEmail = () => {
    const { userId } = useParams();
    const [resent, setResent] = useState(false);

    const resend = async () => {
        const response = await axios.post(`/api/resend-verification/${userId}`);
        setResent(true);
        setTimeout(() => {
            setResent(false);
        }, 2000);
    }

    return (
        <Container maxWidth="sm">
            <Typography align="center">
                <h1>Account Created!</h1>
                <h3>Just verify your email address to continue</h3>
                {resent && <Alert severity="success">Verification email resent!</Alert>}
                <Button
                    onClick={() => { if (!resent) resend() }}
                    color="primary"
                    variant="contained"
                >Resend verification email</Button>
            </Typography>
        </Container>
    );
}