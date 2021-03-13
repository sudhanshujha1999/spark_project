import { Dialog, Typography, TextField, Button, Box, CircularProgress } from "../ui";
import { useState } from "react";
import { useStyles } from "./styles";
import { post } from "../network";
import { isEmail } from "../util";

export const ShareDialog = ({ open, handleClose, user }) => {
    const [value, setValue] = useState("");
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");
    const classes = useStyles();

    const sendEmail = async (referEmail) => {
        if (!isEmail(referEmail)) {
            setError("In-correct email");
            return;
        }
        setSending(true);
        try {
            await post("/api/refer", { senderEmail: user.email, referedEmail: referEmail });
            console.log("Send Email to  " + referEmail);
        } catch (error) {
            console.log(error);
        }
        setSending(false);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} disableScrollLock>
            <Box className={classes.addRosterContainer}>
                <Typography className={classes.formHeading}>
                    Share sparks with your friend.
                    <br />
                    Enter your friend email.
                </Typography>
                <TextField
                    className={classes.inputConatiner}
                    label='Email'
                    value={value}
                    fullWidth
                    error={error}
                    helperText={error}
                    mulltiline={true}
                    variant='outlined'
                    onChange={(e) => {
                        if (error) {
                            setError("");
                        }
                        setValue(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendEmail(value);
                        }
                    }}
                />
                <Box my={1} />
                <Button
                    disabled={sending}
                    className={classes.submitBtn}
                    variant='contained'
                    onClick={(e) => sendEmail(value)}>
                    {sending ? <CircularProgress size='2em' color='secondary' /> : "Submit"}
                </Button>
            </Box>
        </Dialog>
    );
};

export const FormDialog = ({ open, handleClose, user }) => {
    const [value, setValue] = useState("");
    const classes = useStyles();
    const [sending, setSending] = useState(false);

    const sendFeedback = async (feedback) => {
        setSending(true);
        try {
            await post("api/feedback", { email: user.email, feedback });
            console.log("feedback sent");
        } catch (error) {
            console.log(error);
        }
        setSending(false);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} disableScrollLock>
            <Box className={classes.addRosterContainer}>
                <Typography className={classes.formHeading}>
                    Share your view with us about Sparksports
                </Typography>
                <TextField
                    className={classes.inputConatiner}
                    label='Feedback'
                    value={value}
                    fullWidth
                    mulltiline={true}
                    variant='outlined'
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendFeedback(value);
                        }
                    }}
                />
                <Box my={1} />
                <Button
                    disabled={sending}
                    className={classes.submitBtn}
                    color='primary'
                    variant='contained'
                    onClick={(e) => sendFeedback(value)}>
                    {sending ? <CircularProgress size='2em' color='secondary' /> : "Submit"}
                </Button>
            </Box>
        </Dialog>
    );
};
