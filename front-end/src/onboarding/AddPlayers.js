// REMOVE
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useParams, useHistory } from "react-router-dom";
import { isEmail } from "../util";
import {
    Alert,
    Box,
    Button,
    CenteredContainer,
    DeletableListItem,
    Divider,
    Grid,
    TextField,
} from "../ui";
import { onboardingState } from "./onboardingState";

export const AddPlayers = () => {
    const [newPlayerEmail, setNewPlayerEmail] = useState("");
    const [addingPlayerToIndex, setAddingPlayerToIndex] = useState(-1);
    const [onboardingInfo, setOnboardingInfo] = useRecoilState(onboardingState);
    const { newTeamInfo } = onboardingInfo || {};
    const { rosters = [] } = newTeamInfo || {};

    const { schoolId } = useParams();
    const history = useHistory();
    const [error, setError] = useState("");

    useEffect(() => {
        const updatedState = {
            ...onboardingInfo,
            newTeamInfo: {
                ...onboardingInfo.newTeamInfo,
                rosters: rosters.some((roster) => roster.name === "No roster")
                    ? rosters
                    : rosters.concat({ name: "No roster" }),
            },
        };
        setOnboardingInfo(updatedState);
    }, []);

    const onAddPlayer = async () => {
        setError("");
        const isValid = isEmail(newPlayerEmail);

        if (!isValid) {
            setError("Not a valid email");
            return;
        }

        const updatedState = {
            ...onboardingInfo,
            newTeamInfo: {
                ...onboardingInfo.newTeamInfo,
                rosters: Object.assign([], rosters, {
                    [addingPlayerToIndex]: {
                        ...rosters[addingPlayerToIndex],
                        playerEmails: (rosters[addingPlayerToIndex].playerEmails || []).concat(
                            newPlayerEmail
                        ),
                    },
                }),
            },
        };
        setOnboardingInfo(updatedState);
        setNewPlayerEmail("");
        setAddingPlayerToIndex(-1);
    };

    const onCancel = () => {
        setError("");
        setNewPlayerEmail("");
        setAddingPlayerToIndex(-1);
    };

    const onDone = async () => {
        setOnboardingInfo({
            ...onboardingInfo,
            teams: [...onboardingInfo.teams, onboardingInfo.newTeamInfo],
            newTeamInfo: {},
        });
        history.push(`/onboarding/schools/${schoolId}/teams`);
    };

    const onDeletePlayer = (rosterIndex, emailIndex) => {
        const updatedState = {
            ...onboardingInfo,
            newTeamInfo: {
                ...onboardingInfo.newTeamInfo,
                rosters: Object.assign([], rosters, {
                    [rosterIndex]: {
                        ...rosters[rosterIndex],
                        playerEmails: [
                            ...rosters[rosterIndex].playerEmails.slice(0, emailIndex),
                            ...rosters[rosterIndex].playerEmails.slice(emailIndex + 1),
                        ],
                    },
                }),
            },
        };

        setOnboardingInfo(updatedState);
    };

    const onPrevious = async () => {
        history.push(`/onboarding/schools/${schoolId}/teams/new`);
    };

    return (
        <CenteredContainer>
            <h1>Add Players for {newTeamInfo.name}:</h1>
            {error && <Alert severity='error'>{error}</Alert>}
            {rosters.map((roster, i) => (
                <>
                    {roster.name === "No roster" ? (
                        <h3>Players with no roster:</h3>
                    ) : (
                        <h3>Players for {roster.name}:</h3>
                    )}
                    {roster.playerEmails &&
                        roster.playerEmails.map((email, j) => (
                            <DeletableListItem
                                onRequestDelete={(emailIndex) => onDeletePlayer(i, emailIndex)}
                                index={j}>
                                <p>{email}</p>
                            </DeletableListItem>
                        ))}
                    <Box mb={2} style={{ display: "flex" }}>
                        {addingPlayerToIndex === i ? (
                            <>
                                <TextField
                                    value={newPlayerEmail}
                                    onChange={(e) => setNewPlayerEmail(e.target.value)}
                                    style={{ flex: 8, marginRight: 8 }}
                                    label='Email Address'
                                    fullWidth
                                    variant='outlined'
                                />
                                <Button
                                    onClick={onCancel}
                                    style={{ flex: 1, marginRight: 8 }}
                                    color='primary'
                                    variant='contained'>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={onAddPlayer}
                                    style={{ flex: 1 }}
                                    color='primary'
                                    variant='contained'>
                                    Add
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={() => setAddingPlayerToIndex(i)}
                                color='primary'
                                variant='contained'>
                                + Add Player
                            </Button>
                        )}
                    </Box>
                    <Divider />
                </>
            ))}
            <Box py={2}>
                <Grid container justify='space-between'>
                    <Grid item>
                        <Button variant='contained' onClick={onPrevious}>
                            Back
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' color='primary' onClick={onDone}>
                            Done
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </CenteredContainer>
    );
};
