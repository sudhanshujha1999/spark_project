import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useCurrentUser } from '../auth';
import {
    Alert,
    Box,
    Button,
    CenteredContainer,
    CircularProgress,
    Divider,
    Grid,
    TextField,
} from '../ui';
import {
    validateLength,
} from '../util';

const validations = [
    validateLength('fullName', 2),
    validateLength('gamerName', 2),
    validateLength('grade', 1),
    validateLength('tshirtSize', 1),
];

export const PlayerInfo = () => {
    const [fullName, setFullName] = useState('');
    const [gamerName, setGamerName] = useState('');
    const [grade, setGrade] = useState('');
    const [socialMediaLinks, setSocialMediaLinks] = useState([]);
    const [isAddingSocialMediaLink, setIsAddingSocialMediaLink] = useState(false);
    const [newSocialMediaLink, setNewSocialMediaLink] = useState('');
    const [tshirtSize, setTshirtSize] = useState('');
    const [gamesAndRoles, setGamesAndRoles] = useState([]);
    const [isAddingGameAndRole, setIsAddingGameAndRole] = useState(false);
    const [newGame, setNewGame] = useState('');
    const [newRole, setNewRole] = useState('');
    const [bio, setBio] = useState('');
    const { user } = useCurrentUser();
    const history = useHistory();

    const [isUpdating, setIsUpdating] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [networkError, setNetworkError] = useState('');

    const onCancelSocialMediaLink = () => {
        setIsAddingSocialMediaLink(false);
        setNewSocialMediaLink('');
    }

    const onAddSocialMediaLink = () => {
        setSocialMediaLinks([...socialMediaLinks, newSocialMediaLink]);
        setNewSocialMediaLink('');
    }

    const onCancelGameAndRole = () => {
        setIsAddingGameAndRole(false);
        setNewGame('');
        setNewRole('');
    }

    const onAddGameAndRole = () => {
        const newGameAndRole = { game: newGame, role: newRole };
        setGamesAndRoles([...gamesAndRoles, newGameAndRole]);
        setNewGame('');
        setNewRole('');
    }

    const getValidationErrors = () => {
        const fields = {
            fullName,
            gamerName,
            grade,
            socialMediaLinks,
            tshirtSize,
            gamesAndRoles,
            bio,
        };
        const errors = validations
            .filter(validation => !validation.test(fields))
            .map(validation => validation.errorMessage);
        return errors;
    }

    const onNext = async () => {
        const validationErrors = getValidationErrors();
        setValidationErrors(validationErrors);
        if (validationErrors.length > 0) return;

        setIsUpdating(true);
        const userInfo = {
            fullName,
            gamerName,
            grade,
            socialMediaLinks,
            tshirtSize,
            gamesAndRoles,
            bio,
        };
        try {
            const authtoken = await user.getIdToken();
            await axios.post(`/api/users/${user.uid}/onboarding/player`, userInfo, { headers: { authtoken } });
            history.push('/onboarding/done');
        } catch (e) {
            setIsUpdating(false);
            setNetworkError(e.message);
        }
    }

    return (
        <CenteredContainer>
            <h1>Player Info</h1>
            {networkError && <Alert severity="error">{networkError}</Alert>}
            {validationErrors.map(error => (
                <Box mb={2}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            ))}
            <Box mb={2}>
                <TextField
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    fullWidth
                    label="Full Name"
                    variant="outlined" />
            </Box>
            <Box mb={2}>
                <TextField
                    value={gamerName}
                    onChange={e => setGamerName(e.target.value)}
                    fullWidth
                    label="Gamer Name"
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
            <Box mb={2}>
                <TextField
                    value={grade}
                    onChange={e => setGrade(e.target.value)}
                    fullWidth
                    label="Current Grade"
                    variant="outlined" />
            </Box>
            <Divider />
            <h3>Social Media Links:</h3>
            {socialMediaLinks.map(link => (
                <Box pl={1}>
                    <p>{link}</p>
                </Box>
            ))}
            <Box mb={2} style={{ display: 'flex' }}>
                {isAddingSocialMediaLink
                    ? (
                        <>
                        <TextField
                            value={newSocialMediaLink}
                            onChange={e => setNewSocialMediaLink(e.target.value)}
                            style={{ flex: 8, marginRight: 8 }}
                            label="Enter Link"
                            fullWidth
                            variant="outlined" />
                        <Button
                            onClick={onCancelSocialMediaLink}
                            style={{ flex: 1, marginRight: 8 }}
                            color="primary"
                            variant="contained"
                        >Cancel</Button>
                        <Button
                            onClick={onAddSocialMediaLink}
                            style={{ flex: 1, marginRight: 8 }}
                            color="primary"
                            variant="contained"
                        >Add</Button>
                        </>
                    ) : (
                        <Button
                            onClick={() => setIsAddingSocialMediaLink(true)}
                            color="primary"
                            variant="contained"
                        >+ Add Link</Button>
                    )}
            </Box>
            <Divider />
            <Box my={2}>
                <TextField
                    value={tshirtSize}
                    onChange={e => setTshirtSize(e.target.value)}
                    fullWidth
                    label="T-Shirt Size"
                    variant="outlined" />
            </Box>
            <Divider />
            <h3>Other Games You Play:</h3>
            {gamesAndRoles.map(x => (
                <Box pl={1}>
                    <p>{x.game} - {x.role}</p>
                </Box>
            ))}
            <Box mb={2} style={{ display: 'flex' }}>
                {isAddingGameAndRole
                    ? (
                        <>
                        <TextField
                            value={newGame}
                            onChange={e => setNewGame(e.target.value)}
                            style={{ flex: 4, marginRight: 8 }}
                            label="Game Name"
                            fullWidth
                            variant="outlined" />
                        <TextField
                            value={newRole}
                            onChange={e => setNewRole(e.target.value)}
                            style={{ flex: 4, marginRight: 8 }}
                            label="Role"
                            fullWidth
                            variant="outlined" />
                        <Button
                            onClick={onCancelGameAndRole}
                            style={{ flex: 1, marginRight: 8 }}
                            color="primary"
                            variant="contained"
                        >Cancel</Button>
                        <Button
                            onClick={onAddGameAndRole}
                            style={{ flex: 1 }}
                            color="primary"
                            variant="contained"
                        >Add</Button>
                        </>
                    ) : (
                        <Button
                            onClick={() => setIsAddingGameAndRole(true)}
                            color="primary"
                            variant="contained"
                        >+ Add Game</Button>
                    )}
            </Box>
            <Divider />
            <Box py={2}>
                <Grid container justify="space-between">
                    <Grid item>
                        <Button
                            variant="contained"
                            disabled
                        >Back</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onNext}
                        >
                            {isUpdating
                                ? <CircularProgress size={24} />
                                : 'Next'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </CenteredContainer>
    );
}