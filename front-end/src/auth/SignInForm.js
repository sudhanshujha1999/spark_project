import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useQueryParams } from '../routing';
import { signIn } from './signIn';
import { useUser } from './useUser';

export const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user } = useUser();
    const history = useHistory();
    const { dest } = useQueryParams();

    const onSignIn = async () => {
        setError('');
        try {
            await signIn(email, password);
        } catch (e) {
            setError(e.message);
        }
    }

    useEffect(() => {
        if (user) {
            if (user.onboarded) {
                history.push(dest);
            } else {
                history.push('/onboarding/user-info');
            }
        }
    }, [user, dest, history]);

    return (
        <Box>
            <Typography align="center">
                <h1>Sign In</h1>
            </Typography>
            {error && (
                <Box mb={2}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            )}
            <Box mb={2}>
                <TextField
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    fullWidth
                    label="Email address"
                    variant="outlined" />
            </Box>
            <Box mb={2}>
                <TextField
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined" />
            </Box>
            <Box mb={2}>
                <Button
                    onClick={onSignIn}
                    fullWidth
                    variant="contained"
                    size="large"
                    color="primary"
                >Sign In</Button>
            </Box>
        </Box>
    );
}