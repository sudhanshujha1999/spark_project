import { useStyles } from "./styles";
import { useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Button,
    Card,
    Grid,
    //  IconButton,
    TextField,
    Typography,
    EditableTextField,
    CircularProgress,
} from "../ui";
import axios from "axios";
import { ClearIcon, CheckIcon, EditIcon, ExpandMoreIcon } from "../icons";
import { isEmail } from "../util";
import { PlayerCard } from "./PlayerCard";

export const DisplayRosterItem = ({
    rosterId,
    isDefaultRoster,
    rosterName,
    players,
    isCoach,
    invitations,
    currentUserId,
    onDeleteRoster,
    teamId,
    hasCaptian,
    onAddPlayer = async () => {},
}) => {
    const [expanded, setExpanded] = useState(false);
    const [addPlayer, setAddPlayer] = useState(false);
    const [editable, setEditable] = useState(false);
    const [progress, setProgress] = useState(false);
    const [name, setName] = useState(rosterName);
    const [newPlayerEmail, setNewPlayerEmail] = useState("");
    const [newPlayerEmailError, setNewPlayerEmailError] = useState("");
    const classes = useStyles();
    const onClickAdd = async () => {
        if (!isEmail(newPlayerEmail)) return setNewPlayerEmailError("Not a valid email");

        setProgress(true);
        try {
            setNewPlayerEmailError("");
            // console.log(rosterId, newPlayerEmail);
            await onAddPlayer(rosterId, newPlayerEmail, (error) => {
                setNewPlayerEmailError(error);
                if (error === "") {
                    setNewPlayerEmail("");
                    setAddPlayer(false);
                    setProgress(false);
                }
            });
        } catch (e) {
            console.log(e);
            setNewPlayerEmailError("Something went wrong with the server...");
            setProgress(false);
        }
    };

    const editRosterName = async () => {
        try {
            setEditable(false);
            console.log(rosterId, name);
            await axios.put(`/api/roster/${rosterId}/update`, { name });
            console.log("saved");
        } catch (error) {
            setEditable(true);
            console.log(error);
        }
    };

    const handleClickEdit = () => {
        if (!editable) {
            setEditable(!editable);
            return;
        }
        // IF NAME IS EMPTY
        if (name === "") {
            console.log("Set name First");
            return;
        }
        // if the name is not changed return
        if (name === rosterName) {
            setEditable(!editable);
            return;
        }
        editRosterName();
    };

    return (
        <Box my={3}>
            {/* <h3 className={classes.rosterNameItems}>{rosterName}</h3> */}
            <Accordion
                expanded={expanded}
                className={classes.accordianConatiner}
                onChange={(e, expand) => setExpanded(expand)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    className={classes.accordianSummary}>
                    <Box py={1} className={classes.rosterName}>
                        <EditableTextField
                            value={isDefaultRoster ? "Default" : name}
                            setValue={setName}
                            editable={isDefaultRoster ? false : editable}
                            onPressEnter={editRosterName}
                            align='left'
                        />
                    </Box>
                </AccordionSummary>
                <AccordionDetails className={classes.accordianDetails}>
                    {players && players.length > 0 ? (
                        <Grid container justifyContent='center' alignItems='center'>
                            {players.map(
                                (
                                    {
                                        id: playerId,
                                        name: playerName,
                                        gamerName,
                                        bio,
                                        email,
                                        profile_img,
                                        player_role,
                                    },
                                    index
                                ) => (
                                    <>
                                        <Grid item xs={12}>
                                            <PlayerCard
                                                teamId={teamId}
                                                playerRole={player_role}
                                                rosterId={rosterId}
                                                playerId={playerId}
                                                bio={bio}
                                                hasCaptian={hasCaptian}
                                                profileImage={profile_img}
                                                clickable={isCoach || playerId === currentUserId}
                                                playerName={playerName}
                                                gamerName={gamerName}
                                                isCoach={isCoach}
                                                email={email}
                                                show={expanded}
                                                index={index}
                                            />
                                        </Grid>
                                    </>
                                )
                            )}
                        </Grid>
                    ) : (
                        <Box>
                            <Typography variant='h5'>You haven't added any players to this roster yet</Typography>
                        </Box>
                    )}
                    {invitations.map(({ email }) => (
                        <Box mt={3} mb={2}>
                            <Card>
                                <Box p={2}>
                                    <p>{email} - Invitation Pending</p>
                                </Box>
                            </Card>
                        </Box>
                    ))}
                    {isCoach && (
                        <form
                            onSubmit={(e) => {
                                onClickAdd();
                                e.preventDefault();
                            }}>
                            <Box mt={3} mb={2} style={{ display: "flex" }}>
                                {addPlayer ? (
                                    <>
                                        <TextField
                                            error={!!newPlayerEmailError}
                                            helperText={newPlayerEmailError}
                                            value={newPlayerEmail}
                                            onChange={(e) => setNewPlayerEmail(e.target.value)}
                                            style={{ flex: 8, marginRight: 8 }}
                                            label='Email Address'
                                            fullWidth
                                            inputRef={(input) => input && input.focus()}
                                            variant='outlined'
                                        />
                                        <Button
                                            onClick={() => setAddPlayer(false)}
                                            style={{ flex: 1, marginRight: 8 }}
                                            color='primary'
                                            variant='contained'>
                                            Cancel
                                        </Button>
                                        <Button
                                            style={{ flex: 1 }}
                                            color='primary'
                                            variant='contained'
                                            type='submit'
                                            disabled={progress}>
                                            {progress ? <CircularProgress size='2em' /> : "Add"}
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        color='primary'
                                        variant='outlined'
                                        onClick={() => setAddPlayer(true)}>
                                        + Add Member
                                    </Button>
                                )}
                            </Box>
                        </form>
                    )}
                    {!isDefaultRoster && isCoach && (
                        <Box my={1}>
                            <Button
                                startIcon={editable ? <CheckIcon /> : <EditIcon />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClickEdit();
                                }}
                                color='primary'
                                variant='contained'
                                className={classes.rosterEdit}>
                                {editable ? "Save" : "Edit"}
                            </Button>
                            <Button
                                startIcon={<ClearIcon />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteRoster(rosterId);
                                }}
                                className={classes.rosterCancel}>
                                Delete
                            </Button>
                        </Box>
                    )}
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};
