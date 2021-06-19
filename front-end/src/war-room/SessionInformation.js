import { useMemo, useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { CheckIcon, EditIcon, PlayArrowIcon } from "../icons";
import {
    Box,
    Button,
    Chip,
    Divider,
    Fade,
    Grid,
    Typography,
    Tooltip,
    EditableTextField,
    IconButton,
} from "../ui";
import { saveDataFromInfo } from "./recoilState";
import { useStyles } from "./styles";

export const SessionInformation = ({
    session,
    startSession,
    toggleSession = () => {},
    isCoach,
    hasChanged,
    setHasChanged = () => {},
}) => {
    const classes = useStyles();
    const [invitees, setInvitees] = useState(session.invitees || []);
    const [strategy, setStrategy] = useState(session.session.strategy);
    const [editStrategy, setEditStrategy] = useState(false);
    const [opponentStrategy, setOpponentStrategy] = useState(session.session.opponent_strategy);
    const [editOpponentStrategy, setEditOpponentStrategy] = useState(false);
    const saveStratigiesInRecoil = useSetRecoilState(saveDataFromInfo);

    const saveData = () => {
        saveStratigiesInRecoil({
            strategy,
            opponentStrategy,
        });
    };
    useEffect(() => {
        saveData();
        //eslint-disable-next-line
    }, []);

    // this will holdthe value of all the members roles
    // used so there is no delete for the coach or the one created the event
    const memoizedAllUserCurrentRole = useMemo(() => {
        if (session) {
            const creator = session.created_by;
            const rolesArray = session.invitees.map((invitee) => {
                if (invitee.id === creator) {
                    return true;
                } else {
                    return false;
                }
            });
            return rolesArray;
        } else {
            return [];
        }
    }, [session]);

    const toggleEdit = () => {
        if (!hasChanged) {
            setHasChanged(true);
        }
        if (editStrategy) {
            saveData();
        }
        setEditStrategy(!editStrategy);
    };

    const toggleEditOpponent = () => {
        if (!hasChanged) {
            setHasChanged(true);
        }
        if (editOpponentStrategy) {
            saveData();
        }
        setEditOpponentStrategy(!editOpponentStrategy);
    };

    const handleRemove = (member) => {
        if (!hasChanged) {
            setHasChanged(true);
        }
        console.log("make it later");
        // you have to save it first to display the save button
        // setInvitees(invitees.filter((invitee) => invitee.id !== member.id));
    };

    const onStartSession = () => {
        toggleSession();
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant='h2'>{session.name}</Typography>
                <Typography variant='subtitle1'>{new Date(session.date).toDateString()}</Typography>
                <Typography variant='subtitle1'>{session.session.game}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Box className={classes.teamsVs}>
                    <Box className={classes.vsContainer}>
                        <Typography className={classes.vsSign}>VS</Typography>
                    </Box>
                    <Typography className={classes.teamName} component='span'>
                        {session.session.team}
                    </Typography>
                    <Typography className={classes.teamName} component='span'>
                        {session.session.opponent_team}
                    </Typography>
                </Box>
            </Grid>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                        <Typography className={classes.headingSmall} variant='h6'>
                            Description:
                        </Typography>
                    </Box>
                    <Box className={classes.description} mt={3}>
                        <Typography variant='subtitle1'>{session.description}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box>
                        <Typography className={classes.headingSmall} variant='h6'>
                            All members:
                        </Typography>
                    </Box>
                    <Box mt={3}>
                        {invitees.map((member, index) => (
                            <Tooltip title={member.email}>
                                <Chip
                                    className={classes.membersChip}
                                    label={member.name}
                                    onDelete={
                                        // !memoizedAllUserCurrentRole[index]
                                        false ? () => handleRemove(member) : null
                                    }
                                    color='primary'
                                    variant='outlined'
                                />
                            </Tooltip>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                    <Box my={2}>
                        <Typography className={classes.headingMedium} variant='h5'>
                            Match Strategy
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                        <Typography variant='h6'>Strategy:</Typography>
                        {isCoach && (
                            <Box ml={2}>
                                <IconButton size='small' onClick={toggleEdit}>
                                    {editStrategy ? (
                                        <CheckIcon size='small' />
                                    ) : (
                                        <EditIcon size='small' />
                                    )}
                                </IconButton>
                            </Box>
                        )}
                    </Box>

                    {editStrategy && (
                        <Typography className={classes.infoMessage} variant='caption'>
                            Un-saved!
                        </Typography>
                    )}
                    <Box className={classes.description} mt={3}>
                        <EditableTextField
                            value={strategy}
                            setValue={setStrategy}
                            multi={true}
                            placeholder="What's your strategy"
                            editable={editStrategy}
                            align='left'
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                        <Typography variant='h6'>Opponent Strategy:</Typography>
                        {isCoach && (
                            <Box ml={2}>
                                <IconButton size='small' onClick={toggleEditOpponent}>
                                    {editOpponentStrategy ? (
                                        <CheckIcon size='small' />
                                    ) : (
                                        <EditIcon size='small' />
                                    )}
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                    {editOpponentStrategy && (
                        <Typography className={classes.infoMessage} variant='caption'>
                            Un-saved!
                        </Typography>
                    )}
                    <Box className={classes.description} mt={3}>
                        <EditableTextField
                            value={opponentStrategy}
                            setValue={setOpponentStrategy}
                            multi={true}
                            placeholder="What's your opponent strategy"
                            editable={editOpponentStrategy}
                            align='left'
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Fade in={!startSession}>
                        <Button
                            color='secondary'
                            variant='outlined'
                            endIcon={<PlayArrowIcon />}
                            onClick={onStartSession}>
                            {isCoach ? "Start map strategy" : "View map strategy"}
                        </Button>
                    </Fade>
                    <Box mb={4} />
                </Grid>
            </Grid>
        </Grid>
    );
};
