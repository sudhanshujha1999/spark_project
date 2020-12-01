import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../auth';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    TextField,
} from '../ui';

export const UserInfo = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [otherEmails, setOtherEmails] = useState([]);
    const [bio, setBio] = useState('');

    const { user } = useUser();
    const history = useHistory();

    const [isAddingEmail, setIsAddingEmail] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState('');

    const onNext = async () => {
        setIsUpdating(true);
        const updates = { firstName, lastName, bio, otherEmails };
        try {
            const authtoken = await user.getIdToken();
            await axios.post(`/api/users/${user.uid}`, { updates }, { headers: { authtoken } });
            history.push('/onboarding/school');
        } catch (e) {
            setIsUpdating(false);
            setError(e.message);
        }
    }

    return (
        <Container maxWidth="sm">
            <h1>User Info</h1>
            {error && <Alert severity="error">{error}</Alert>}
            <Box mb={2}>
                <h3>Basic Info:</h3>
            </Box>
            <Box mb={2}>
                <TextField
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    fullWidth
                    label="First Name"
                    variant="outlined" />
            </Box>
            <Box mb={2}>
                <TextField
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    fullWidth
                    label="Last Name"
                    variant="outlined" />
            </Box>
            <Box mb={2} mt={2}>
                <TextField
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    label="Bio"
                    multiline
                    placeholder="Tell others a little about yourself"
                    defaultValue=""
                    fullWidth
                    rows={4}
                    variant="outlined" />
            </Box>
            <Divider />
            <Box mb={2}>
                <h3>Email Addresses:</h3>
            </Box>
            <Box mb={2}>
                <p>{user.email}</p>
                {otherEmails.map(email => (
                    <p key={email}>{email}</p>
                ))}
            </Box>
            <Box mb={2} style={{ display: 'flex '}}>
                {isAddingEmail
                    ? (
                        <>
                        <TextField
                            value={newEmail}
                            onChange={e => setNewEmail(e.target.value)}
                            style={{ flex: 8 }}
                            label="New Email Address"
                            variant="outlined" />
                        <Button
                            style={{ flex: 1 }}
                            onClick={() => setIsAddingEmail(false)}
                            variant="contained"
                        >Cancel</Button>
                        <Button
                            style={{ flex: 1 }}
                            onClick={() => {
                                setOtherEmails([...otherEmails, newEmail]);
                                setIsAddingEmail(true);
                                setNewEmail('');
                            }}
                            variant="contained"
                        >Add</Button>
                        </>
                    ) : (
                        <Button
                            onClick={() => setIsAddingEmail(true)}
                            variant="contained"
                        >+ Add Email</Button>
                    )}
            </Box>
            <Divider />
            <Box py={2}>
                <Button
                    variant="contained"
                    disabled
                >Back</Button>
                <Button
                    variant="contained"
                    onClick={onNext}
                >
                    {isUpdating
                        ? <CircularProgress size={24} />
                        : 'Next'}
                </Button>
            </Box>
        </Container>
    )
}