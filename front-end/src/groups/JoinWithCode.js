import { useState } from "react";
import { Alert, Box, Button, Loading, TextField, Typography } from "../ui";
import { post } from "../network";
import { useOrganizations } from "../teams";
import { useHistory } from "react-router-dom";

export const JoinWithCode = ({ onClose = () => {} }) => {
    const { organizations } = useOrganizations();
    const [code, setCode] = useState("1A7D2F9A");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const handleJoin = async () => {
        setError("");
        if (!code) {
            setError("Please enter a group code");
            return;
        }
        if (!organizations._id) {
            setError("You are not a part of an Oragnization, please join a organization first!");
            return;
        }
        // loading
        setLoading(true);
        try {
            console.log(code);
            const {
                data: { groupId },
            } = await post(`/api/community-group/${organizations._id}/join/`, {
                groupCode: code,
            });
            history.push(`/${groupId}/groups/`);
            onClose();
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
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
                <Button
                    disabled={loading}
                    onClick={handleJoin}
                    fullWidth
                    color='primary'
                    variant='contained'>
                    {loading ? <Loading height='fit-content' size='2em' /> : "Join"}
                </Button>
            </Box>
        </Box>
    );
};
