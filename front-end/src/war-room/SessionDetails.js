import { useParams, Prompt } from "react-router-dom";
import { SaveIcon } from "../icons";
import { post } from "../network";
import { Box, Button, CircularProgress, Container, Typography } from "../ui";
import { useGetSession } from "./useGetSession";
import { useStyles } from "./styles";
import { SessionRoom } from "./SessionRoom";
import { useState } from "react";
import { useOrganizations } from "../teams";
import { useIsCoach } from "../users/useIsCoach";
import { SessionInformation } from "./SessionInformation";
import { useRecoilValue } from "recoil";
import { pathsState, variableDataState } from "./recoilState";

export const SessionDetails = () => {
    const { sessionId } = useParams();
    const { organizations } = useOrganizations();
    const { isCoach } = useIsCoach(organizations._id);
    const { session, isLoading } = useGetSession(sessionId);
    const [startSession, setStartSession] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [saving, setSaving] = useState(false);
    const classes = useStyles();
    const allStages = useRecoilValue(pathsState);
    const changedData = useRecoilValue(variableDataState);
    const toggleSession = () => {
        setStartSession(!startSession);
    };
    const endSession = async () => {
        setSaving(true);
        const values = { ...changedData, stages: allStages };
        try {
            await post(`/api/${session.session._id}/save/session`, values);
        } catch (error) {
            console.log(error);
        }
        setSaving(false);
        setIsChanged(false);
    };

    return (
        <Container maxWidth='xl'>
            {/* LOADING PART COMMENTED UNTIL THE BACKEND IS MADE */}
            {isLoading ? (
                <Box className={classes.loading}>
                    <CircularProgress color='secondary' />
                </Box>
            ) : session ? (
                <Box>
                    <SessionInformation
                        isCoach={isCoach}
                        session={session}
                        startSession={startSession}
                        toggleSession={toggleSession}
                        hasChanged={isChanged}
                        setHasChanged={setIsChanged}
                    />
                    {startSession && (
                        <SessionRoom
                            isCoach={isCoach}
                            hasChanged={isChanged}
                            setHasChanged={setIsChanged}
                            session={session}
                            startSession={startSession}
                            toggleSession={toggleSession}
                        />
                    )}
                    {isCoach && isChanged && (
                        <Button
                            color='secondary'
                            variant='contained'
                            className={classes.saveBtn}
                            endIcon={<SaveIcon />}
                            disabled={saving}
                            onClick={endSession}>
                            {saving ? (
                                <CircularProgress color='secondary' size='2em' />
                            ) : (
                                "save session"
                            )}
                        </Button>
                    )}
                </Box>
            ) : (
                <Box className={classes.loading}>
                    <Typography variant='h4'>No valid session found!!</Typography>
                </Box>
            )}
            <Prompt
                message='You have unsaved progress please save them, otherwise they will be lost'
                when={isChanged}
            />
        </Container>
    );
};
