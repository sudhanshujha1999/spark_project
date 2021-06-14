import { Box, Grid, Typography } from "../ui";
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom";

export const AllSessions = ({ sessions }) => {
    const classes = useStyles();
    const history = useHistory();

    const goToSession = (session) => {
        history.push(`/war-room/${session._id}/session`);
    };

    return (
        <Box>
            <Grid container>
                {sessions.map((event, index) => (
                    <Grid item key={index} xs={12} md={6} lg={4} spacing={3}>
                        <Box
                            className={classes.container}
                            onClick={() => goToSession(event.session)}>
                            <Typography className={classes.date}>
                                {new Date(event.date).toDateString()}
                            </Typography>
                            <Box className={classes.teams}>
                                <Typography className={classes.vs}>{event.session.team}</Typography>
                                <Typography className={classes.vs}>
                                    {event.session.opponent_team}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
