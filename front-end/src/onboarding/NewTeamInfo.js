import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useHistory, useParams } from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
    CenteredContainer,
    DeletableListItem,
    Divider,
    Grid,
    TextField,
} from '../ui';
import { onboardingState } from './onboardingState';

const validations = [{
    test: ({ name }) => name.length > 1,
    errorMessage: 'Team name must be 2 characters or longer',
}, {
    test: ({ game }) => game.length > 1,
    errorMessage: 'Please specify what game your team will be playing',
}, {
    test: ({ rosters }) => rosters.length > 0,
    errorMessage: 'You must add at least one roster',
}];

export const NewTeamInfo = () => {
    const [isAddingRoster, setIsAddingRoster] = useState(false);
    const [newRosterName, setNewRosterName] = useState('');
    const [onboardingInfo, setOnboardingInfo] = useRecoilState(onboardingState);
    const {
        name: initialName = '',
        game: initialGame = '',
        rosters: initialRosters = [],
    } = onboardingInfo.newTeamInfo || {};
    const [name, setName] = useState(initialName);
    const [game, setGame] = useState(initialGame);
    const [rosters, setRosters] = useState(initialRosters);
    const [validationErrors, setValidationErrors] = useState([]);

    const history = useHistory();
    const { schoolId } = useParams();

    const getValidationErrors = () => {
        const fields = { name, game, rosters };
        const errors = validations
            .filter(validation => !validation.test(fields))
            .map(validation => validation.errorMessage);
        return errors;
    }
    
    const onNext = async () => {
        const validationErrors = getValidationErrors();
        setValidationErrors(validationErrors);
        if (validationErrors.length > 0) return;

        const newTeamInfo = {
            name,
            game,
            schoolId,
            rosters,
        };
        setOnboardingInfo({
            ...onboardingInfo,
            newTeamInfo,
        });
        history.push(`/onboarding/schools/123/teams/234/players`);
    }

    const onDeleteRoster = index => {
        setRosters([...rosters.slice(0, index), ...rosters.slice(index + 1)]);
    }

    const onPrevious = () => {
        history.push('/onboarding/schools/123/teams');
    }

    return (
        <CenteredContainer>
            <h1>New Team Info</h1>
            {validationErrors.map(error => (
                <Box mb={2}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            ))}
            <Box mb={2}>
                <TextField
                    value={name}
                    onChange={e => setName(e.target.value)}
                    fullWidth
                    label="Team Name"
                    variant="outlined" />
            </Box>
            <Box mb={2}>
                <TextField
                    value={game}
                    onChange={e => setGame(e.target.value)}
                    fullWidth
                    label="Game"
                    variant="outlined" />
            </Box>
            <Divider />
            <Box mb={2}>
                <h3>Team Rosters:</h3>
            </Box>
            <Box mb={2}>
                {rosters.map((roster, i) => (
                    <>
                    <DeletableListItem onRequestDelete={onDeleteRoster} index={i}>
                        <p key={roster.name}>{roster.name}</p>
                    </DeletableListItem>
                    <Divider />
                    </>
                ))}
            </Box>
            <Box mb={2} style={{ display: 'flex '}}>
                {isAddingRoster
                    ? (
                        <>
                        <TextField
                            value={newRosterName}
                            onChange={e => setNewRosterName(e.target.value)}
                            style={{ flex: 8, marginRight: 8 }}
                            label="Roster Name"
                            variant="outlined" />
                        <Button
                            style={{ flex: 1, marginRight: 8 }}
                            onClick={() => setIsAddingRoster(false)}
                            color="primary"
                            variant="contained"
                        >Cancel</Button>
                        <Button
                            color="primary"
                            style={{ flex: 1 }}
                            onClick={() => {
                                setRosters([...rosters, { name: newRosterName }]);
                                setIsAddingRoster(true);
                                setNewRosterName('');
                            }}
                            variant="contained"
                        >Add</Button>
                        </>
                    ) : (
                        <Button
                            onClick={() => setIsAddingRoster(true)}
                            color="primary"
                            variant="contained"
                        >+ Add Roster</Button>
                    )}
            </Box>
            <Divider />
            <Box py={2}>
                <Grid container justify="space-between">
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={onPrevious}
                        >
                            Back
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onNext}
                        >
                            Next
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </CenteredContainer>
    );
}