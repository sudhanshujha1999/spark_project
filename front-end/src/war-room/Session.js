import { useParams } from "react-router-dom";
import { Box, Button, CircularProgress, Container, Grid, Typography } from "../ui";
import { DrawingBoard } from "./DrawingBoard";
import { AllStageList } from "./AllStageList";
import { useRecoilValue } from "recoil";
import { pathsState } from "./recoilState";
import { useGetSession } from "./useGetSession";
import { useStyles } from "./styles";
import { post } from "../network";

export const Session = () => {
    const { sessionId } = useParams();
    const allStages = useRecoilValue(pathsState);
    const { session, isLoading } = useGetSession(sessionId);
    const classes = useStyles();

    const endSession = async () => {
        console.log(allStages);
        const res = await post(`/api/${session.session._id}/save/session`, { stages: allStages });
        console.log(res);
    };

    return (
        <Container maxWidth='xl'>
            {/* LOADING PART COMMENTED UNTIL THE BACKEND IS MADE */}
            {isLoading ? (
                <Box className={classes.loading}>
                    <CircularProgress color='secondary' />
                </Box>
            ) : (
                <Grid container>
                    <Grid xs={12}>
                        <Typography align='center' variant='h4' gutterBottom>
                            {session.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <DrawingBoard />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AllStageList />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            color='secondary'
                            variant='contained'
                            onClick={endSession}>
                            End Session
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};
