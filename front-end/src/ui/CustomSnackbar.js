import { Snackbar, Alert } from "./";

export const CustomSnackbar = ({ message, setMessage, type }) => {
    function handleClose(event, reason) {
        if (reason === "clickaway") {
            return;
        }
        setMessage("");
    }

    return (
        <Snackbar
            open={message === "" ? false : true}
            autoHideDuration={3000}
            onClose={handleClose}>
            <Alert onClose={handleClose} variant="filled" severity={type}>
                {message}
            </Alert>
        </Snackbar>
    );
};
