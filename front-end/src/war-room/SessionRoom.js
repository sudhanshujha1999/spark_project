import { Box, Divider, Fade, Grid, Typography } from "../ui";
import { DrawingBoard } from "./DrawingBoard";
import { AllStageList } from "./AllStageList";
import { useStyles } from "./styles";

export const SessionRoom = ({
    startSession,
    isCoach = false,
    session,
    hasChanged,
    setHasChanged = () => {},
    toggleSession = () => {},
}) => {
    const classes = useStyles();

    return (
        <Fade in={startSession}>
            <Grid container>
                <Grid item xs={12}>
                    <Box my={3}>
                        <Divider />
                    </Box>
                    <Typography
                        className={classes.headingMedium}
                        align='center'
                        variant='h5'
                        gutterBottom>
                        Map Strategy
                    </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    <DrawingBoard
                        isCoach={isCoach}
                        setHasChanged={isCoach ? setHasChanged : () => console.log("not-a-coach")}
                        mapLink={session.session.map_link}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <AllStageList
                        isCoach={isCoach}
                        setHasChanged={isCoach ? setHasChanged : () => console.log("not-a-coach")}
                    />
                </Grid>
            </Grid>
        </Fade>
    );
};
