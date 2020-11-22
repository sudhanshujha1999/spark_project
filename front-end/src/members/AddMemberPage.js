import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export const AddMemberPage = () => {
    const [email, emailAddress] = useState('');

    return (
        <Container maxWidth="sm">
            <Typography align="center">
                <h1>New Player Information</h1>
            </Typography>
            <Box mb={2}>
                <TextField fullWidth label="Email address" variant="outlined" />
            </Box>
            <Box mb={2}>
                <TextField fullWidth label="Full name" variant="outlined" />
            </Box>
            <Box mb={2}>
                <TextField fullWidth label="Roster role" variant="outlined" />
            </Box>
            <Box mb={2}>
                <TextField fullWidth label="Alias" variant="outlined" />
            </Box>
            <Button
                color="primary"
                fullWidth
                size="large"
                endIcon={<SendIcon />}
                variant="contained"
            >
                Send Invite &amp; Add To Roster
            </Button>
        </Container>
    )
}