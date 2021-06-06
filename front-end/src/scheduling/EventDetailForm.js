import { useState } from "react";
import { DeleteIcon } from "../icons";
import { Alert, Box, IconButton, Divider, Typography } from "../ui";
import { useStyles } from "./styles";

export const EventDetailForm = ({ selectedEvent, userId, deleteEvent = async () => {} }) => {
    const { name, description, date, time, invitees } = selectedEvent;
    const [error, setError] = useState("");
    const classes = useStyles();
    const onclickDelete = async () => {
        try {
            setError("");
            if (selectedEvent.created_by !== userId) {
                // check user permission
                setError("You don't have the permission to delete this event");
                return;
            }
            await deleteEvent(selectedEvent._id);
            // console.log("send-req");
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <Box className={classes.eventDetailsForm}>
            <Box
                className={classes.gradient}
                style={{
                    height: invitees.length > 7 ? "550px" : "100%",
                    background: selectedEvent.background_color.background,
                }}
            />
            <IconButton className={classes.deleteButton} onClick={onclickDelete}>
                <DeleteIcon />
            </IconButton>
            <Box mb={2}>
                <Typography variant='h4'>{name}</Typography>
            </Box>
            <Box mb={2}>
                <Typography variant='h6'>Date: {date.toLocaleDateString()}</Typography>
                <Typography variant='h6'>Time: {time}</Typography>
                <Typography variant='h6' gutterBottom>
                    Description:
                </Typography>
                <Box ml={2}>
                    <Typography variant='body1'>{description}</Typography>
                </Box>
            </Box>
            <Divider />
            <Box mb={2}>
                <Typography variant='h6'>Invitees:</Typography>
                {invitees.map(({ email }) => (
                    <Box ml={2}>
                        <Typography variant='body1'>{email}</Typography>
                    </Box>
                ))}
            </Box>
            {error && (
                <Box my={1}>
                    <Alert severity='error'>{error}</Alert>
                </Box>
            )}
        </Box>
    );
};
