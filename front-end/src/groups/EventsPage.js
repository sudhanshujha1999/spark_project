import { Box, Button, Card, Dialog, Grid, Paper, Typography } from "../ui";
import { useStyles } from "./styles";
import { useGroupDetails } from "./useGroupDetails";
import { useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import { CreateTournament } from "../sparks-tournament";
import { useAllEvents } from "./useAllEvents";

export const EventsPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const { groupId } = useParams();
    const { groupDetails } = useGroupDetails(groupId);
    const { userTournament } = useAllEvents(groupId);
    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    };

    const handleClick = (id) => {
        history.push(`/${id}/tournament`);
    };

    return (
        <Box>
            <Typography variant='h2' gutterBottom>
                Events
            </Typography>
            <Box my={3}>
                <Typography className={classes.smallHeading}>My events</Typography>
                <Box my={1}>
                    <Grid container>
                        {userTournament.map((tournament) => (
                            <Grid item xs={12} sm={6} md={3}>
                                <Card onClick={() => handleClick(tournament._id)}>
                                    <Box p={1}>
                                        <Typography variant='subtitle2'>
                                            {tournament.name}
                                        </Typography>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
            <Button onClick={() => setOpen(true)} color='primary' variant='contained'>
                Create tournament
            </Button>
            <Dialog maxWidth='lg' open={open} onClose={onClose} disableScrollLock>
                <Paper className={classes.dialog}>
                    <CreateTournament groupId={groupDetails._id} />
                </Paper>
            </Dialog>
        </Box>
    );
};
