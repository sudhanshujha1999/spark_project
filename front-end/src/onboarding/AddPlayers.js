import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../auth';
import {
    Box,
    Button,
    Container,
    TextField,
} from '../ui';

export const AddPlayers = () => {
    const { teamId } = useParams();
    const [team, setTeam] = useState({});
    const { players = [] } = team || {};
    const { user } = useUser();
    const history = useHistory();
    
    const addPlayer = async () => {
        const response = await axios.post(`/teams/${teamId}/players`);
    }

    const backToTeams = async () => {
        history.push(`/onboarding/school/${team.schoolId}/teams`);
    }

    const onPrevious = async () => {
        history.push(`/onboarding/school/${team.schoolId}/teams/new`);
    }

    return (
        <Container maxWidth="sm">
            <h1>Players</h1>
            {players.map(player => (
                <h3>{player.email}</h3>
            ))}
            <Button
                variant="contained"
            >Add Player</Button>
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