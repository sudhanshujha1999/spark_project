import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { useQueryParams } from "../routing";
import { Alert, Box, Button, CenteredContainer, TextField, Typography } from "../ui";
import { signIn } from "./signIn";
import { useCurrentUserInfo } from "../users";

export const SignInPage = () => {
    const { dest, email: emailFromInvitation } = useQueryParams();
    const [email, setEmail] = useState(emailFromInvitation || "");
    const [password, setPassword] = useState("");
    const [networkError, setNetworkError] = useState("");
    const { userInfo, isLoading } = useCurrentUserInfo();
    const history = useHistory();

    const onSignIn = async () => {
        setNetworkError("");
        try {
            await signIn(email, password);
        } catch (e) {
            setNetworkError(e.message);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (userInfo && !userInfo.isConfirmed) {
        firebase.auth().signOut();
        console.log(userInfo.auth_id);
        return <Redirect to={`/please-verify-email/${userInfo.auth_id}?variant=1`} />;
    }

    if (userInfo && !userInfo.isOnboarded) {
        return <Redirect to='onboarding/user-info' />;
    }

    if (userInfo) {
        return <Redirect to={dest || "/"} />;
    }

    return (
        <CenteredContainer>
            <Typography align='center'>
                <h1>Sign In</h1>
            </Typography>
            {networkError && (
                <Box mb={2}>
                    <Alert severity='error'>{networkError}</Alert>
                </Box>
            )}
            <Box mb={2}>
                <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    label='Email address'
                    variant='outlined'
                />
            </Box>
            <Box mb={2}>
                <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    label='Password'
                    type='password'
                    variant='outlined'
                />
            </Box>
            <Box mb={2}>
                <Button
                    onClick={onSignIn}
                    fullWidth
                    variant='contained'
                    size='large'
                    color='primary'>
                    Sign In
                </Button>
            </Box>
        </CenteredContainer>
    );
};
