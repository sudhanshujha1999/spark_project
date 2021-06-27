import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Dialog,
    Typography,
} from "../ui";
import { ExpandMoreIcon } from "../icons";
import { AddMatch } from "./AddMatch";
import { useState } from "react";
import { useStyles } from "./styles";

export const LeagueItem = ({ league, score, updateLeagues, handleRemove, showActions = true }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);

    const handleChange = (e, change) => {
        setExpanded(change);
    };

    const onClose = () => {
        setOpen(false);
    };

    const successFunction = () => {
        updateLeagues();
        setOpen(false);
    };

    return (
        <>
            <Accordion
                onChange={handleChange}
                className={
                    expanded ? `${classes.newsBox} ${classes.expanded}` : `${classes.newsBox}`
                }
                elevation={false}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box className={classes.leagueName}>
                        <Typography
                            className={classes.leagueTitle}
                            variant='subtitle2'
                            gutterBottom>
                            {league.tournament}
                        </Typography>
                        <Typography className={classes.leagueTitle} variant='subtitle1'>
                            {`(${league.team})`}
                        </Typography>
                        <Box ml={3}>
                            <Typography variant='h6'>
                                {score.win} - {score.lose}
                            </Typography>
                        </Box>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Box
                        style={{
                            width: "100%",
                        }}>
                        {league.matches.length > 0 ? (
                            league.matches.map((match) => (
                                <Box
                                    mb={1}
                                    className={`${classes.leagueMatch} ${
                                        match.win ? classes.win : classes.lose
                                    }`}>
                                    <Typography className={classes.leagueTitle}>
                                        VS &nbsp;
                                        <Typography component='span' color='secondary'>
                                            {match.opponent}
                                        </Typography>
                                    </Typography>
                                    <Typography className={classes.leagueTitle} variant='subtitle1'>
                                        {`(${match.win ? "WON" : "LOST"})`}
                                    </Typography>
                                </Box>
                            ))
                        ) : (
                            <Box>
                                <Typography variant='h6'>No matches right now!</Typography>
                            </Box>
                        )}
                        {showActions && (
                            <Box mt={2}>
                                <Box display='flex' alignItems='center' flexDirection='row'>
                                    <Box mr={2}>
                                        <Button
                                            onClick={() => setOpen(true)}
                                            color='secondary'
                                            variant='outlined'>
                                            Add match
                                        </Button>
                                    </Box>
                                    <Box mr={2}>
                                        <Button
                                            onClick={() => handleRemove(league._id)}
                                            className={classes.deleteBtn}
                                            variant='contained'>
                                            Delete League
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </AccordionDetails>
            </Accordion>
            {/* add match is not a seprate dialog component because iwant to reuse that component in the info page if we do that */}
            <Dialog open={open} close={onClose} onBackdropClick={onClose} disableScrollLock>
                <Box p={2}>
                    <AddMatch league={league} successFunction={successFunction} />
                </Box>
            </Dialog>
        </>
    );
};
