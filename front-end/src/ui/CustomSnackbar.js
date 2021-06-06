import { Snackbar, Alert } from "./";
import { useState, useEffect } from "react";

export const CustomSnackbar = ({ message, setMessage, type }) => {
    const [view, setView] = useState(false);

    function handleClose(event, reason) {
        if (reason === "clickaway") {
            return;
        }
        setView(false);
    }

    useEffect(() => {
        if (message) {
            setView(true);
        } else {
            setView(false);
        }
    }, [message]);

    return (
        <Snackbar open={view} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} variant='filled' severity={type}>
                {message}
            </Alert>
        </Snackbar>
    );
};
