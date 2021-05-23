import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography } from "../ui";
import { ExpandMoreIcon } from "../icons";
import { useStyles } from "./Styles";

export const EachTeamMembers = ({ team }) => {
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
                <Box
                    style={{
                        width: "100%",
                    }}>
                    {team.admins && (
                        <Box className={`${classes.flexColumn} ${classes.coaches}`}>
                            <Typography variant='h6' color='primary' gutterBottom>
                                Coach
                            </Typography>
                            {team.admins.map((coach) => (
                                <Typography>{coach.name}</Typography>
                            ))}
                        </Box>
                    )}
                    {team.players && (
                        <>
                            <Box className={`${classes.flexColumn} ${classes.coaches}`}>
                                <Typography gutterBottom color='primary' variant='h6'>
                                    Players
                                </Typography>
                                {team.players.length > 0 ? (
                                    team.players.map((player) => (
                                        <>
                                            <Typography gutterBottom>
                                                {player.name}&nbsp;
                                            </Typography>
                                        </>
                                    ))
                                ) : (
                                    <Typography variant='body2' gutterBottom>
                                        This team has no players
                                    </Typography>
                                )}
                            </Box>
                        </>
                    )}
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};
