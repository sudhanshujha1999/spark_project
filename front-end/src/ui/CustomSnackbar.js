import { Snackbar, Alert } from "./";
import { useState, useEffect, useCallback } from "react";

export const CustomSnackbar = ({ message, setMessage, type }) => {
    const [view, setView] = useState(false);
    const setMessageEmpty = useCallback(() => {
        setTimeout(() => setMessage(""), 500);
    }, [setMessage]);

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

    useEffect(() => {
        if (!view) {
            setMessageEmpty();
        }
    }, [view, setMessageEmpty]);

    return (
        <Snackbar open={view} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} variant='filled' severity={type}>
                {message}
            </Alert>
        </Snackbar>
    );
};
