import { Box, Typography, Button } from "../ui";
import { useStyles } from "./styles";

export const WarRoomLandingPage = ({ openAddMatch = () => console.log("default") }) => {
    const classes = useStyles();
    return (
        <Box className={classes.heading}>
            <Typography className={classes.bigHeading}>WAR ROOM</Typography>
            <Typography className={classes.subHeading} variant='h6'>
                A group is a way to interact with other schools! Any head coach create a group and
                invite up to 25 other schools. Here you'll be able to post updates on a bulletin,
                share stream schedules, create group tournaments and much more! To join a group you
                need to have access to the special group code associated with that group that the
                admin of that group can send you.
            </Typography>
            <Box className={classes.headingPicture} />

            <Box mt={5}>
                <Button
                    onClick={() => {
                        openAddMatch(true);
                    }}
                    className={classes.buttons}
                    color='secondary'
                    variant='contained'>
                    Create a match
                </Button>
            </Box>
        </Box>
    );
};
