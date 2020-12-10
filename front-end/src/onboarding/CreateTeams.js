import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../auth';
import { useTeams } from '../teams';
import {
    Box,
    Button,
    Container,
    TextField,
} from '../ui';

export const CreateTeams = () => {
    const { schoolId } = useParams();
    const { user } = useUser();
    const teams = useTeams(user.uid, 'coach');
    const history = useHistory();

    const onDone = () => {
        history.push('/onboarding/done');
    }

    const onClickAddTeam = async () => {
        history.push(`/onboarding/schools/${schoolId}/teams/new`);
    }

    const onPrevious = async () => {
        history.push('/onboarding/schools');
    }
    
    return (
        <Container maxWidth="sm">
            <h1>Create Teams</h1>
            {teams.map(team => (
                <h3>{team.name}</h3>
            ))}
            <Button
                onClick={onClickAddTeam}
                variant="contained"
                fullWidth
            >+ Add Team</Button>
            <Button
                onClick={onPrevious}
                variant="contained"
            >Back</Button>
            <Button
                variant="contained"
                onClick={onDone}
            >Done</Button>
        </Container>
    )
}