import { Box, CircularProgress, Typography } from "../ui";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQueryParams } from "../routing";
import { makeStyles } from "@material-ui/styles";
import { useCurrentUserInfo } from "../users";
import firebase from "firebase/app";

export const DiscordRedirect = () => {
    const { token } = useQueryParams();
    const { isLoading, userInfo } = useCurrentUserInfo();
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        if (!isLoading && userInfo) {
            if (userInfo && !userInfo.isConfirmed) {
                firebase.auth().signOut();
                return history.push(`/please-verify-email/${userInfo.auth_id}?variant=1`);
            }

            if (userInfo && !userInfo.isOnboarded) {
                return history.push(`/onboarding/user-info`);
            }

            if (userInfo) {
                return history.push(`/`);
            }
        }
        if (token) {
            firebase.auth().signInWithCustomToken(token);
        } else {
            console.log("no-token-redirect-to-fail");
        }
    }, [token, userInfo, isLoading, history]);

    return (
        <Box className={classes.loading}>
            <Box display='flex' flexDirection='column'>
                <Typography variant='h4' gutterBottom>
                    Please wait while we log you in!
                </Typography>
                <Box mx='auto' width='fit-content'>
                    <CircularProgress />
                </Box>
            </Box>
        </Box>
    );
};

const useStyles = makeStyles((theme) => ({
    loading: {
        display: "grid",
        placeItems: "center",
        minHeight: "75vh",
    },
}));
