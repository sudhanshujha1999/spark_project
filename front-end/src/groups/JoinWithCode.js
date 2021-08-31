import { useState } from "react";
import { Alert, Box, Button, TextField, Typography } from "../ui";
import { post } from "../network";

export const JoinWithCode = ({ onClose = () => {} }) => {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const handleJoin = async () => {
        setError("");
        if (!code) {
            setError("Please enter a group code");
            return;
        }
        // loading
        try {
            console.log(code);

            onClose();
        } catch (error) {}
        // loading
    };

    return (
        <Box mb={2} display='flex' flexDirection='column'>
            <Box mb={1}>
                <Typography variant='subtitle2' gutterBottom>
                    Connect your organizaiton with other group using Group-Code
                </Typography>
            </Box>
            <Box mb={2}>
                <TextField
                    label='Group code'
                    variant='outlined'
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    fullWidth
                />
            </Box>
            {error && (
                <Box mb={2}>
                    <Alert severity='error'>{error}</Alert>
                </Box>
            )}
            <Box mb={2}>
                <Button onClick={handleJoin} fullWidth color='primary' variant='contained'>
                    Join
                </Button>
            </Box>
        </Box>
    );
};
