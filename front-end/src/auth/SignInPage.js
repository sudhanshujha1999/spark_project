import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { useQueryParams } from "../routing";
import {
    Alert,
    Box,
    Button,
    BackButton,
    CenteredContainer,
    Grid,
    TextField,
    Typography,
} from "../ui";
import { signIn } from "./signIn";
import { useCurrentUserInfo, useDiscordUri } from "../users";
import { DiscordSvgIcon } from "../img/DiscordSvgIcon";
import { useStyles } from "./styles";
import video from "../img/video0.mp4";
import bg from "../img/signInBg.png";

export const SignInPage = () => {
    const { dest, email: emailFromInvitation } = useQueryParams();
    const { discordLoginUrl } = useDiscordUri();
    const [email, setEmail] = useState(emailFromInvitation || "");
    const [password, setPassword] = useState("");
    const [networkError, setNetworkError] = useState("");
    const { userInfo, isLoading } = useCurrentUserInfo();
    const history = useHistory();
    const classes = useStyles();

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
        return <Redirect to={`/please-verify-email/${userInfo.auth_id}?variant=1`} />;
    }

    if (userInfo && !userInfo.isOnboarded) {
        return <Redirect to='onboarding/user-info' />;
    }

    if (userInfo) {
        return <Redirect to={dest || "/dashboard"} />;
    }

    return (
        <Box style={{ padding: "20px" }}>
            <BackButton goBack={() => history.push("/")} />
            <Box className={classes.backgroundContainer}>
                <img
                    className={classes.bgImage}
                    rel='preload'
                    src={bg}
                    alt='Sign-in-page-background'
                />
                <Box>
                    {/* <video
                            // src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                            src={video}
                            alt='clip'
                            autoPlay={true}
                            muted
                            loop
                        /> */}
                </Box>
            </Box>
            <Grid container>
                <Grid item xs={12} sm={5} md={5}>
                    {/* background image */}
                    <Box height='100%' display='flex' alignItems='center' justifyContent='center'>
                        <Box display='flex' flexDirection='column'>
                            <Box className={classes.heading}>
                                <Box className={classes.block} component='span' />
                                <Typography variant='h2' className={classes.headingText}>
                                    SPARK
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={7}>
                    <CenteredContainer>
                        <Box className={classes.formContainer}>
                            <Typography
                                align='center'
                                style={{ margin: "0 20px 20px 20px", fontSize: "30px" }}
                                variant='h1'>
                                Sign In
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
                                    color='secondary'>
                                    Sign In
                                </Button>
                            </Box>
                            <Box mb={2}>
                                <Button
                                    // need to make a env variable for it
                                    href={`${discordLoginUrl}`}
                                    fullWidth
                                    className={classes.discordBtn}
                                    variant='contained'
                                    size='large'
                                    color='secondary'
                                    endIcon={<DiscordSvgIcon viewBox='0 0 71 55' />}>
                                    Sign In with Discord
                                </Button>
                            </Box>
                        </Box>
                    </CenteredContainer>
                </Grid>
            </Grid>
        </Box>
    );
};
