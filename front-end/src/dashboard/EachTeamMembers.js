import { useTeam } from "../teams/useTeam";
import { useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Typography,
    CircularProgress,
} from "../ui";
import { ExpandMoreIcon } from "../icons";
import { useStyles } from "./Styles";

export const EachTeamMembers = ({ team }) => {
    const { team: teamInfo, isLoading } = useTeam(team.id);
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleChange = (e, change) => {
        setExpanded(change);
    };

    return (
        <Accordion
            onChange={handleChange}
            className={
                expanded ? `${classes.accordion} ${classes.expanded}` : `${classes.accordion}`
            }
            elevation={false}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.headingAccordian}>{team.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {isLoading ? (
                    <CircularProgress color='secondary' />
                ) : (
                    <Box
                        style={{
                            width: "100%",
                        }}>
                        {teamInfo.coaches && (
                            <Box className={`${classes.flexColumn} ${classes.coaches}`}>
                                <Typography variant='h6' color='primary' gutterBottom>
                                    Coach
                                </Typography>
                                {teamInfo.coaches.map((coach) => (
                                    <Typography>{coach.email}</Typography>
                                ))}
                            </Box>
                        )}
                        {teamInfo.rosters && (
                            <>
                                <Box className={`${classes.flexColumn} ${classes.coaches}`}>
                                    <Typography gutterBottom color='primary' variant='h6'>
                                        Players
                                    </Typography>
                                    {teamInfo.rosters.map((roster) => {
                                        return roster.players.map((player) => (
                                            <>
                                                <Typography gutterBottom>
                                                    {player.email}&nbsp;
                                                    <Typography
                                                        component='span'
                                                        className={classes.rosterName}>
                                                        {`(${roster.name})`}
                                                    </Typography>
                                                </Typography>
                                            </>
                                        ));
                                    })}
                                </Box>
                            </>
                        )}
                    </Box>
                )}
            </AccordionDetails>
        </Accordion>
    );
};
