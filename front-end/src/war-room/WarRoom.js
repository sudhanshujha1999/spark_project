import { Container, Grid, Button, Box, CircularProgress, Fade } from '../ui';
import { useOrganizations } from '../teams';
import { useIsCoach } from '../users/useIsCoach';
import { AllSessions } from './AllSessions';
import { useStyles } from './styles';
import { AddWarRoomSession } from './AddWarRoomSession';
import { useRef, useState } from 'react';
import { useGetAllSessions } from './useGetAllSessions';
import { LeagueRecords } from './LeagueRecords';

export const WarRoom = () => {
    const { organizations, isLoading: isLoadingOrganizations } = useOrganizations();
    const { canEditEvents, teamsForEvents } = useIsCoach(organizations._id);
    const { sessions, isLoading: isLoadingSessions } = useGetAllSessions();
    const [addSession, setAddSession] = useState(false);
    const heightRef = useRef(null);
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
                        <Grid item xs={12} md={7}>
                            <AllSessions height={heightRef} sessions={sessions} />
                            {canEditEvents && (
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
                            )}
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <LeagueRecords
                                height={heightRef.current?.clientHeight}
                                teams={organizations.teams}
                                organizationId={organizations._id}
                                hasPermission={canEditEvents}
                                allowedTeams={teamsForEvents}
                            />
                        </Grid>
                    </Grid>
                    {addSession && (
                        <Fade
                            in={addSession}
                            style={{
                                height: addSession ? 'auto' : 0,
                                transitionDelay: addSession ? '100ms' : '0ms',
                            }}>
                            <Box>
                                <AddWarRoomSession
                                    handleCancel={handleCancel}
                                    teams={organizations.teams}
                                    allowedTeams={teamsForEvents}
                                />
                            </Box>
                        </Fade>
                    )}
                </>
            )}
        </Container>
    );
};
