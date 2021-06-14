import { Container, Grid, Button, Box, CircularProgress, Slide, Fade } from "../ui";
import { useOrganizations } from "../teams";
import { useIsCoach } from "../users/useIsCoach";
import { AllSessions } from "./AllSessions";
import { useStyles } from "./styles";
import { AddWarRoomSession } from "./AddWarRoomSession";
import { useState } from "react";
import { useGetAllSessions } from "./useGetAllSessions";

export const WarRoom = () => {
    const { organizations, isLoading: isLoadingOrganizations } = useOrganizations();
    const isCoach = useIsCoach(organizations ? organizations._id : "");
    const { sessions, isLoading: isLoadingSessions } = useGetAllSessions();
    const [addSession, setAddSession] = useState(false);
    const classes = useStyles();
    const handleAdd = () => {
        setAddSession(true);
    };
    const handleCancel = () => {
        setAddSession(false);
    };

    return (
        <Container maxWidth='xl'>
            {isLoadingSessions || isLoadingOrganizations || !organizations ? (
                <Box className={classes.loading}>
                    <CircularProgress color='secondary' />
                </Box>
            ) : (
                <>
                    <Grid container>
                        <Grid item xs={12}>
                            <AllSessions sessions={sessions} />
                        </Grid>
                        {isCoach && (
                            <Grid xs={12}>
                                <Fade in={!addSession}>
                                    <Box>
                                        <Box my={5} />
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            onClick={handleAdd}>
                                            Create a session
                                        </Button>
                                    </Box>
                                </Fade>
                            </Grid>
                        )}
                    </Grid>
                    <Slide
                        in={addSession}
                        style={{
                            height: addSession ? "auto" : 0,
                            transitionDelay: addSession ? "100ms" : "0ms",
                        }}
                        direction='right'>
                        <Box>
                            <AddWarRoomSession
                                handleCancel={handleCancel}
                                teams={organizations.teams}
                            />
                        </Box>
                    </Slide>
                </>
            )}
        </Container>
    );
};
