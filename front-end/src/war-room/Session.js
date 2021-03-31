import { useParams } from "react-router-dom";
import { Container, Grid, Typography } from "../ui";
import { DrawingBoard } from "./DrawingBoard";
import { AllStageList } from "./AllStageList";
import { useEffect } from "react";

export const Session = () => {
    const { sessionId } = useParams();

    useEffect(() => {
        // CALL FOR SESSION HERE
        console.log(sessionId);
    }, [sessionId]);

    return (
        <Container maxWidth='xl'>
            <Grid container>
                {/* LOADING PART COMMENTED UNTIL THE BACKEND IS MADE */}
                {/* {isLoading && isLoadingTeams ? (
                <Box className={classes.loading}>
                <CircularProgress color='secondary' />
                </Box>
            ) : ( */}
                <Grid xs={12}>
                    <Typography align='center' variant='h4' gutterBottom>
                        Session
                    </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    <DrawingBoard />
                </Grid>
                <Grid item xs={12} md={4}>
                    <AllStageList />
                </Grid>

                {/* )} */}
            </Grid>
        </Container>
    );
};
