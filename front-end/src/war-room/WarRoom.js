import { Box, Container, Grid } from "../ui";
import { DrawingBoard } from "./DrawingBoard";
import { AllStageList } from "./AllStageList";

export const WarRoom = () => {
    return (
        <Container maxWidth='xl'>
            <Grid container>
                <Grid item xs={12} md={8}>
                    <DrawingBoard />
                </Grid>
                <Grid item xs={12} md={4}>
                    <AllStageList />
                </Grid>
            </Grid>
        </Container>
    );
};
