import { Box, Grid, Typography } from "../ui";
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { SessionItem } from "./SessionItem";

export const AllSessions = ({ sessions = [] }) => {
    const classes = useStyles();
    const history = useHistory();
    const [upcoming, setUpcoming] = useState([]);
    const [past, setPast] = useState([]);

    const goToSession = (session) => {
        history.push(`/war-room/${session._id}/session`);
    };

    useEffect(() => {
        if (sessions.length > 0) {
            const CURRENT_TIME = new Date();
            const CURRENT_DATE = CURRENT_TIME.getDate();
            const CURRENT_MONTH = CURRENT_TIME.getMonth();
            const CURRENT_YEAR = CURRENT_TIME.getFullYear();

            const pastSessions = [];
            const upcomingSessions = [];
            for (let i = 0; i < sessions.length; i++) {
                const sessionTime = new Date(sessions[i].date);
                const sessionDate = sessionTime.getDate();
                const sessionMonth = sessionTime.getMonth();
                const sessionYear = sessionTime.getFullYear();
                if (CURRENT_TIME.setHours(0, 0, 0, 0) === sessionTime.setHours(0, 0, 0, 0)) {
                    console.log("same");
                }
                if (sessionYear >= CURRENT_YEAR) {
                    // sesion is upcoming
                    if (sessionMonth >= CURRENT_MONTH) {
                        // sesion is upcoming
                        if (sessionDate >= CURRENT_DATE) {
                            upcomingSessions.push(sessions[i]);
                            continue;
                        }
                    }
                }
                pastSessions.push(sessions[i]);
            }
            setUpcoming(upcomingSessions);
            setPast(pastSessions);
        }
    }, [sessions]);

    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Box mb={4}>
                        <Typography variant='h5' className={classes.headingMedium}>
                            Upcoming Events
                        </Typography>
                    </Box>
                </Grid>
                {upcoming.lenght > 0 ? (
                    <>
                        <Grid item className={classes.eventGradient} xs={12}>
                            <Box className={`${classes.eventsContainer} ${classes.customScrollX}`}>
                                {upcoming.map((event, index) => (
                                    <Box mx={2} key={index}>
                                        <SessionItem event={event} goToSession={goToSession} />
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    </>
                ) : (
                    <Grid item xs={12}>
                        <Typography variant='h6'>No upcoming events...</Typography>
                    </Grid>
                )}
                {past.length > 0 && (
                    <>
                        <Grid item xs={12}>
                            <Box my={4}>
                                <Typography variant='h5' className={classes.headingMedium}>
                                    Past Events
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item className={classes.eventGradient} xs={12}>
                            <Box className={`${classes.eventsContainer} ${classes.customScrollX}`}>
                                {past.map((event, index) => (
                                    <Box mx={2} key={index}>
                                        <SessionItem event={event} goToSession={goToSession} />
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    </>
                )}
            </Grid>
        </Box>
    );
};
