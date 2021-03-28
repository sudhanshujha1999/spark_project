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
        test: ({ name }) => name.length > 1,
        errorMessage: "School name must be 2 characters or longer",
    },
];

export const SchoolInfo = () => {
    const [onboardingInfo, setOnboardingInfo] = useRecoilState(onboardingState);
    const { name: initialName = "" } = onboardingInfo.schoolInfo;
    const [name, setName] = useState(initialName);

    const history = useHistory();

    const [isUpdating, setIsUpdating] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [networkError, setNetworkError] = useState("");

    const getValidationErrors = () => {
        const fields = { name };
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
        try {
            const schoolInfo = { name };
            setOnboardingInfo({ ...onboardingInfo, schoolInfo });
            history.push(`/onboarding/schools/123/teams`);
        } catch (e) {
            setIsUpdating(false);
            setNetworkError(e.message);
        }
    };

    const onPrevious = async () => {
        history.push("/onboarding/user-info");
    };

    return (
        <CenteredContainer>
            <h1>Add Organization Info</h1>
            <Box mb={2}>{networkError && <Alert severity='error'>{networkError}</Alert>}</Box>
            {validationErrors.map((error) => (
                <Box mb={2}>
                    <Alert severity='error'>{error}</Alert>
                </Box>
            ))}
            <Box mb={2}>
                <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    label='Institution Name'
                    variant='outlined'
                />
            </Box>
            <Divider />
            <Box py={2}>
                <Grid container justify='space-between'>
                    <Grid item>
                        <Button variant='contained' onClick={onPrevious}>
                            Back
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color='primary' variant='contained' onClick={onNext}>
                            {isUpdating ? <CircularProgress size={24} /> : "Next"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </CenteredContainer>
    );
};
