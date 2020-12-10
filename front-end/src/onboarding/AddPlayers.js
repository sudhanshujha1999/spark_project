import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../auth';
import { useTeamPlayers } from '../teams';
import {
    Box,
    Button,
    Container,
    TextField,
} from '../ui';

export const AddPlayers = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [position, setPosition] = useState('');
    const [email, setEmail] = useState('');
    const [isAddingPlayer, setIsAddingPlayer] = useState(false);

    const { schoolId, teamId } = useParams();
    const players = useTeamPlayers(teamId);
    const { user } = useUser();
    const history = useHistory();
    
    const onAddPlayer = async () => {
        const data = {
            email,
            position,
            groupId: teamId,
        };
        const authtoken = await user.getIdToken();
        const response = await axios.post(`/api/teams/${teamId}/players`, data, { headers: { authtoken } });
        // setTeam(response.data);
        setIsAddingPlayer(false);
    }

    const backToTeams = async () => {
        history.push(`/onboarding/schools/${schoolId}/teams`);
    }

    const onPrevious = async () => {
        // history.push(`/onboarding/schools/${team.schoolId}/teams/new`);
    }

    return (
        <Container maxWidth="sm">
            <h1>Players</h1>
            {players.map(player => (
                <h3>{player.email}</h3>
            ))}
            <Box mb={2}>
                {isAddingPlayer
                    ? (
                        <>
                        <Box mb={2}>
                            <TextField
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                label="First Name"
                                fullWidth
                                variant="outlined" />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                label="Last Name"
                                fullWidth
                                variant="outlined" />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                label="Email Address"
                                fullWidth
                                variant="outlined" />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                value={position}
                                onChange={e => setPosition(e.target.value)}
                                label="Position"
                                fullWidth
                                variant="outlined" />
                        </Box>
                        <Box mb={2}>
                            <Button
                                onClick={() => setIsAddingPlayer(false)}
                                variant="contained"
                            >Cancel</Button>
                            <Button
                                onClick={onAddPlayer}
                                variant="contained"
                            >Send Invite</Button>
                        </Box>
                        </>
                    ) : (
                        <Button
                            onClick={() => setIsAddingPlayer(true)}
                            variant="contained"
                        >+ Add Player</Button>
                    )}
            </Box>
            <Button
                variant="contained"
                onClick={onPrevious}
            >Back</Button>
            <Button
                variant="contained"
                onClick={backToTeams}
            >Done</Button>
        </Container>
    );
}