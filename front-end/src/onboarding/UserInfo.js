import { useState } from "react";
import { useRecoilState } from "recoil";
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
import { onboardingState } from "./onboardingState";

const validations = [
    {
        test: ({ firstName }) => firstName.length > 1,
        errorMessage: "First name must be 2 characters or longer",
    },
    {
        test: ({ lastName }) => lastName.length > 1,
        errorMessage: "Last name must be 2 characters or longer",
    },
];

export const UserInfo = () => {
    const [onboardingInfo, setOnboardingInfo] = useRecoilState(onboardingState);
    const {
        firstName: initialFirstName = "",
        lastName: initialLastName = "",
        bio: initialBio = "",
    } = onboardingInfo.userInfo;
    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);
    const [bio, setBio] = useState(initialBio);

    const history = useHistory();

    const [isUpdating, setIsUpdating] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    const getValidationErrors = () => {
        const fields = { firstName, lastName, bio };
        const errors = validations
            .filter((validation) => !validation.test(fields))
            .map((validation) => validation.errorMessage);
        return errors;
    };

    const onNext = async () => {
        const validationErrors = getValidationErrors();
        setValidationErrors(validationErrors);
        if (validationErrors.length > 0) return;

        setIsUpdating(true);

        const userInfo = { firstName, lastName, bio };
        setOnboardingInfo({ ...onboardingInfo, userInfo });
        history.push("/onboarding/schools");
    };

    return (
        <CenteredContainer>
            <h1>User Info</h1>
            <p>
                To get started, we just need a little bit of info from you about yourself, your
                organization, etc.
            </p>
            <hr />
            {validationErrors.map((error) => (
                <Box mb={2}>
                    <Alert severity='error'>{error}</Alert>
                </Box>
            ))}
            <Box mb={2}>
                <h3>Basic Info:</h3>
            </Box>
            <Box mb={2}>
                <TextField
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                    label='First Name'
                    variant='outlined'
                />
            </Box>
            <Box mb={2}>
                <TextField
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                    label='Last Name'
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
            <Divider />
            <Box py={2}>
                <Grid container justify='space-between'>
                    <Grid item>
                        <Button color='primary' variant='contained' disabled>
                            Back
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={onNext} color='primary' variant='contained'>
                            {isUpdating ? <CircularProgress size={24} /> : "Next"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </CenteredContainer>
    );
};
