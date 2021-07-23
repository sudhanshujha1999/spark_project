// REMOVE
import { useState } from "react";
import { useRecoilState } from "recoil";
import { useHistory, useParams } from "react-router-dom";
import { useCurrentUser } from "../auth";
import { post } from "../network";
import {
    Alert,
    Box,
    Button,
    CenteredContainer,
    CircularProgress,
    DeletableListItem,
    Divider,
    Grid,
} from "../ui";
import { onboardingState } from "./onboardingState";

const getAllPlayerEmails = (team) =>
    team.rosters.reduce((acc, roster) => [...acc, ...(roster.playerEmails || [])], []);

export const CreateTeams = () => {
    const [onboardingInfo, setOnboardingInfo] = useRecoilState(onboardingState);
    const { teams } = onboardingInfo;
    const { schoolId } = useParams();
    const { user } = useCurrentUser();
    const history = useHistory();

    const [isUpdating, setIsUpdating] = useState(false);
    const [networkError, setNetworkError] = useState("");

    const onDone = async () => {
        setNetworkError("");

        if (teams.length === 0) {
            setNetworkError("You must add at least one team");
            return;
        }

        setIsUpdating(true);
        try {
            await post(`/api/users/${user.uid}/onboarding/coach`, onboardingInfo);
            history.push("/onboarding/done");
        } catch (e) {
            setNetworkError(e.message);
        }
        setIsUpdating(false);
    };

    const onClickAddTeam = async () => {
        history.push(`/onboarding/schools/${schoolId}/teams/new`);
    };

    const onDeleteTeam = (index) => {
        setOnboardingInfo({
            ...onboardingInfo,
            teams: [...teams.slice(0, index), ...teams.slice(index + 1)],
        });
    };

    const onPrevious = async () => {
        history.push("/onboarding/schools");
    };

    return (
        <CenteredContainer>
            <h1>{teams.length === 0 ? "Add Teams To Your School" : "Add Additional Teams"}</h1>
            {networkError && (
                <Box mb={2}>
                    <Alert severity='error'>{networkError}</Alert>
                </Box>
            )}
            <Divider />
            <h3>Current teams:</h3>
            {teams.length === 0 ? (
                <p>You haven't added any teams yet</p>
            ) : (
                <>
                    {teams.map((team, i) => (
                        <>
                            <DeletableListItem onRequestDelete={onDeleteTeam} index={i}>
                                <h3>{team.name}</h3>
                                <Box ml={2}>
                                    <p>- {team.rosters.length - 1} roster(s)</p>
                                    <p>- {getAllPlayerEmails(team).length} total player(s)</p>
                                </Box>
                            </DeletableListItem>
                            <Divider />
                        </>
                    ))}
                </>
            )}
            <Box py={2}>
                <Button onClick={onClickAddTeam} color='primary' variant='contained' fullWidth>
                    {teams.length === 0 ? "+ Add Team" : "+ Add Another Team"}
                </Button>
            </Box>
            <Divider />
            <Box py={2}>
                <Grid container justifyContent='space-between'>
                    <Grid item>
                        <Button variant='contained' onClick={onPrevious}>
                            Back
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={onDone}
                            disabled={isUpdating}>
                            {isUpdating ? <CircularProgress /> : "Done"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </CenteredContainer>
    );
};
