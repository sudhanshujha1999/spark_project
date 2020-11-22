import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../auth';
import {
    Box,
    Button,
    Container,
    Divider,
    TextField,
} from '../ui';

export const UserInfo = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [emails, setEmails] = useState([]);
    const [bio, setBio] = useState('');

    const [isAddingEmail, setIsAddingEmail] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    const { user } = useUser();
    const history = useHistory();
    
    const onNext = async () => {
        // const updates = { name, bio };
        // await axios.post(`/users/${user.uid}`, { updates });
        history.push('/onboarding/school');
    }

    return (
        <Container maxWidth="sm">
            <h1>User Info</h1>
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
            <Divider />
            <Box mb={2}>
                <h3>Email Addresses:</h3>
            </Box>
            <Box mb={2}>
                <p>{user.email}</p>
                {emails.map(email => (
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
                                setEmails([...emails, newEmail]);
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
            <Box mb={2} mt={2}>
                <TextField
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    fullWidth
                    label="Bio"
                    variant="outlined" />
            </Box>
            <Button
                variant="contained"
                disabled
            >Back</Button>
            <Button
                variant="contained"
                onClick={onNext}>Next</Button>
        </Container>
    )
}