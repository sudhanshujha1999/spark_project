import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    Alert,
    Box,
    Button,
    CenteredContainer,
    CircularProgress,
    Divider,
    Grid,
    TextField,
} from "../ui";
import firebase from "firebase";
import "firebase/storage";
import { post } from "../network";
import { EditIcon } from "../icons";
import { validateLength } from "../util";
import { useRecoilState } from "recoil";
import { userState } from "../users/userState";
// import { onboardingState } from "./onboardingState";
import { useStyles } from "./styles";
import { useCurrentUserInfo } from "../users";

const validations = [validateLength("fullName", 2), validateLength("gamerName", 2)];
const TYPES = ["image/jgp", "image/jpeg", "image/png"];

export const UserInfo = () => {
    const classes = useStyles();
    const [userInState, setUserInState] = useRecoilState(userState);
    const { userInfo: user } = useCurrentUserInfo();
    // We can use this if we want to more steps to this on-boarding
    // const [onboardingInfo, setOnboardingInfo] = useRecoilState(onboardingState);
    // const {
    //     fullName: initialFullName = "",
    //     gamerName: initialGamerName = "",
    //     bio: initialBio = "",
    // } = onboardingInfo.userInfo;
    const [fullName, setFullName] = useState("");
    const [gamerName, setGamerName] = useState("");
    const [url, setUrl] = useState("");
    const [img, setImg] = useState("");
    const [bio, setBio] = useState("");

    const history = useHistory();

    const [isUpdating, setIsUpdating] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    const getValidationErrors = () => {
        const fields = {
            fullName,
            gamerName,
            bio,
        };
        const errors = validations
            .filter((validation) => !validation.test(fields))
            .map((validation) => validation.errorMessage);
        return errors;
    };

    const onFinish = async () => {
        const validationErrors = getValidationErrors();
        setValidationErrors(validationErrors);
        if (validationErrors.length > 0) return;

        setIsUpdating(true);

        let userInfo = { full_name: fullName, bio, gamer_name: gamerName };
        if (img) {
            // ADD IMAGE GET URL AND UPLOAD
            const storageRef = firebase
                .storage()
                .ref(`/profile-image/${fullName}&name=${img.name}`);
            storageRef.put(img).on(
                "state_changed",
                (snapshot) => {
                    console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                },
                (err) => {
                    console.log(err);
                },
                () =>
                    storageRef
                        .getDownloadURL()
                        .then((url) => {
                            userInfo.profile_img = url;
                        })
                        .catch((error) => {
                            console.log(error);
                        })
            );
            console.log("add url to update object");
        }
        try {
            const {
                data: { user: newUser },
            } = await post(`/api/users/${user.uid}/onboarding/complete`, userInfo);
            // Update info in the DB
            console.log(newUser);
            setUserInState({ ...userInState, ...userInfo, isOnboarded: true });
            history.push("/onboarding/done");
        } catch (error) {
            console.log(error.message);
        }
        setIsUpdating(false);
    };

    const imgfunction = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && TYPES.includes(selectedFile.type)) {
            setImg(selectedFile);
            setUrl(URL.createObjectURL(selectedFile));
        }
    };

    return (
        <CenteredContainer>
            <h1>User Info</h1>
            <p>To get started, we just need a little bit of info from you about yourself.</p>
            <Divider />
            {validationErrors.map((error) => (
                <Box mb={1}>
                    <Alert severity='error'>{error}</Alert>
                </Box>
            ))}
            <Box mb={2}>
                <h3>Basic Info:</h3>
            </Box>
            <Grid container className={classes.infoContainer}>
                <Grid
                    item
                    xs={12}
                    sm={4}
                    style={{
                        overflow: "visible",
                    }}>
                    {url ? (
                        <Box
                            className={`${classes.profileBox} ${classes.profileWithImageBox}`}
                            style={{
                                backgroundImage: `url(${url})`,
                            }}>
                            <Button
                                color='primary'
                                variant='contained'
                                endIcon={<EditIcon fontSize='small' />}
                                component='label'
                                className={classes.editBtn}>
                                Change picture
                                <input type='file' hidden onChange={imgfunction} />
                            </Button>
                        </Box>
                    ) : (
                        <Button component='label' className={classes.profileBox}>
                            Add a profile picture
                            <input type='file' hidden onChange={imgfunction} />
                        </Button>
                    )}
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Box mb={2}>
                        <TextField
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            fullWidth
                            label='First Name'
                            variant='outlined'
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            value={gamerName}
                            onChange={(e) => setGamerName(e.target.value)}
                            fullWidth
                            label='Gamer Name'
                            variant='outlined'
                        />
                    </Box>
                    <Box mb={2} mt={2}>
                        <TextField
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            label='Bio'
                            multiline
                            placeholder='Tell others a little about yourself'
                            defaultValue=''
                            fullWidth
                            rows={4}
                            variant='outlined'
                        />
                    </Box>
                </Grid>
            </Grid>
            <Divider />
            <Box py={2}>
                <Grid container justify='space-between'>
                    <Grid item xs={12}>
                        <Button
                            onClick={onFinish}
                            disabled={isUpdating}
                            fullWidth
                            color='secondary'
                            variant='contained'>
                            {isUpdating ? <CircularProgress size='2em' /> : "Finish"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </CenteredContainer>
    );
};
