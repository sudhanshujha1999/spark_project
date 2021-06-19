import { Box, Grid, Typography } from "../ui";
import { useStyles } from "./styles";

export const SessionItem = ({ event, goToSession = () => {} }) => {
    const classes = useStyles();

    return (
        <Box className={classes.container} onClick={() => goToSession(event.session)}>
            <Typography className={classes.date}>{new Date(event.date).toDateString()}</Typography>
            <Box className={classes.teams}>
                <Typography className={classes.vs}>{event.session.team}</Typography>
                <Typography className={classes.vs}>{event.session.opponent_team}</Typography>
            </Box>
        </Box>
    );
};
