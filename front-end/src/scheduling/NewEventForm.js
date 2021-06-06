import { useState } from "react";
import { COLOR_CODES as colors } from "../util/colorCodes";
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    TextField,
    Tooltip,
    Typography,
} from "../ui";
import { makeStyles } from "@material-ui/core/styles";
import { AddPlayersInEvent } from "./AddPlayersInEvent";

const validations = [
    {
        test: ({ name }) => name.length > 1,
        errorMessage: "Name must be 2 characters or longer",
    },
    {
        test: ({ time }) => time.length > 1,
        errorMessage: "Please specify the time for event",
    },
    {
        test: ({ description }) => description.length > 0,
        errorMessage: "You must add a description",
    },
];

export const NewEventForm = ({ selectedDate, onSubmitEvent = () => {}, sending, userId }) => {
    const [date, setDate] = useState(selectedDate);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("");
    const [backgroundColor, setBackgroundColor] = useState(colors[0]);
    const [validationErrors, setValidationErrors] = useState([]);
    const [invitees, setInvitees] = useState([]);
    const classes = useStyles();

    const getValidationErrors = () => {
        const fields = { name, time, description };
        const errors = validations
            .filter((validation) => !validation.test(fields))
            .map((validation) => validation.errorMessage);
        return errors;
    };

    const onClick = () => {
        const validationErrors = getValidationErrors();
        setValidationErrors(validationErrors);
        if (validationErrors.length > 0) return;
        // right now there is no invitees Check
        const inviteesData = invitees.map(({ email, id }) => {
            return { email, id };
        });
        onSubmitEvent({ name, date, description, time, invitees: inviteesData, backgroundColor });
    };

    return (
        <Box className={`${classes.form} ${classes.customScroll}`}>
            <h1>New Event For {date.toLocaleDateString()}</h1>
            <Box mb={2}>
                <TextField
                    label='Event Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant='outlined'
                    fullWidth
                />
            </Box>
            <Box mb={2}>
                <TextField
                    label='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    variant='outlined'
                    fullWidth
                />
            </Box>
            <Box mb={2}>
                <TextField
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    label='Time'
                    variant='outlined'
                    fullWidth
                />
            </Box>
            <Box mb={2} className={classes.displayRow}>
                {colors.map((color, i) => {
                    return (
                        <Box
                            className={
                                backgroundColor === color
                                    ? `${classes.active} ${classes.color}`
                                    : classes.color
                            }
                            style={{
                                background: color.background,
                            }}
                            onClick={() => setBackgroundColor(color)}
                            component='div'
                        />
                    );
                })}
            </Box>
            <Divider />
            <Box my={2}>
                <Typography variant='h6'>Invite players and/or coaches:</Typography>
            </Box>
            <Box mb={2}>
                {invitees.length > 0 && (
                    <>
                        <Box ml={2} mb={2}>
                            <Typography variant='subtitle2'>Players/Coach invited</Typography>
                        </Box>
                        {invitees.map((invitee) => (
                            <Tooltip title={invitee.email}>
                                <Chip
                                    label={invitee.name}
                                    onDelete={() =>
                                        setInvitees((prevState) =>
                                            prevState.filter((value) => value.id !== invitee.id)
                                        )
                                    }
                                    color='secondary'
                                    variant='outlined'
                                />
                            </Tooltip>
                        ))}
                    </>
                )}
            </Box>
            <AddPlayersInEvent userId={userId} invitees={invitees} setInvitees={setInvitees} />
            <Button
                onClick={onClick}
                color='primary'
                fullWidth
                disabled={sending}
                variant='contained'>
                {sending ? <CircularProgress color='primary' /> : "Create New Event"}
            </Button>
            {validationErrors.map((error) => (
                <Box mt={1}>
                    <Alert severity='error'>{error}</Alert>
                </Box>
            ))}
        </Box>
    );
};

const useStyles = makeStyles((theme) => ({
    displayRow: {
        display: "flex",
        flexFlow: "row wrap",
    },
    color: {
        borderRadius: "50%",
        height: 20,
        width: 20,
        cursor: "pointer",
        marginRight: "10px",
    },
    form: {
        minWidth: 600,
        maxHeight: "80vh",
        padding: "0px 15px",
        overflowY: "scroll",
    },
    active: {
        transform: "scale(1.3)",
        position: "relative",
        "&::before": {
            position: "absolute",
            top: 0,
            left: 0,
            content: '""',
            width: "100%",
            height: "100%",
            border: "2px solid #eaeaea",
            borderRadius: "50%",
        },
    },
    customScroll: {
        "&::-webkit-scrollbar": {
            width: "8px",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 10,
        },
        "&::-webkit-scrollbar-thumb": {
            borderRadius: 10,
            opacity: "0.8",
            backgroundColor: theme.palette.secondary.main,
        },
    },
}));
