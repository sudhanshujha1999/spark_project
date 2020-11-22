import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { RoleSelector } from './RoleSelector';

const roleOptions = [{
    value: 'coach',
    displayText: 'I\'m a coach',
}, {
    value: 'player',
    displayText: 'I\'m a player',
}];

export const CreateAccountForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [selectedRole, setSelectedRole] = useState(roleOptions[0]);
    const history = useHistory();

    const onCreateAccount = async () => {
        try {
            if (password !== confirmPassword) {
                throw new Error('Passwords don\'t match');
            }
            
            const data = {
                email,
                role: selectedRole.value,
                password,
            };
            const response = await axios.post('/api/users', data);
            const { id } = response.data;
            history.push(`/please-verify-email/${id}`);
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <Box>
            <Typography align="center">
                <h1>Create Account</h1>
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
                <TextField
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    variant="outlined" />
            </Box>
            <Box mb={2}>
                <Grid container spacing={2}>
                    <RoleSelector
                        onChange={option => setSelectedRole(option)}
                        options={roleOptions}
                        selectedOption={selectedRole}
                    />
                </Grid>
            </Box>
            <Box mb={2}>
                <Button
                    onClick={onCreateAccount}
                    fullWidth
                    variant="contained"
                    size="large"
                    color="primary"
                >Create Account</Button>
            </Box>
        </Box>
    );
}