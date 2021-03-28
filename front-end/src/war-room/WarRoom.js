import { Container, Grid, Button, Box, CircularProgress, Slide, Fade } from "../ui";
import { DrawingBoard } from "./DrawingBoard";
import { AllStageList } from "./AllStageList";
import { useTeams } from "../teams";
import { useCurrentUserInfo } from "../users";
import { PreviousSessions } from "./PreviousSessions";
import { useStyles } from "./styles";
import { AddWarRoomSession } from "./AddWarRoomSession";
import { useState } from "react";

export const WarRoom = () => {
    const { userInfo, isLoading } = useCurrentUserInfo();
    const { membershipTypeId = "" } = userInfo || {};
    const isCoach = membershipTypeId === "coach";
    const [teams, isLoadingTeams] = useTeams();
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
            {isLoading && isLoadingTeams ? (
                <Box className={classes.loading}>
                    <CircularProgress color='secondary' />
                </Box>
            ) : (
                <>
                    <Grid container>
                        <Grid item xs={12}>
                            <PreviousSessions />
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
                        {/* <Grid item xs={12} md={8}>
                    <DrawingBoard />
                </Grid>
                <Grid item xs={12} md={4}>
                    <AllStageList />
                </Grid> */}
                    </Grid>
                    <Slide in={addSession} direction='right'>
                        <Box>
                            <AddWarRoomSession handleCancel={handleCancel} teams={teams} />
                        </Box>
                    </Slide>
                </>
            )}
        </Container>
    );
};
