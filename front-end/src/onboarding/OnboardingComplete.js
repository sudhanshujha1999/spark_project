import { useHistory } from "react-router-dom";
import { CheckCircleIcon } from "../icons";
import { Box, Button, CenteredContainer, Typography } from "../ui";

export const OnboardingComplete = () => {
    const history = useHistory();
    const onGoToDashboard = () => {
        history.push("/dashboard");
    };

    return (
        <CenteredContainer minWidth={200}>
            <Box align='center' width='100%'>
                <CheckCircleIcon style={{ color: "#7289da", fontSize: 100 }} />
            </Box>
            <Box my={2}>
                <Typography variant='h2' align='center'>
                    All Done!
                </Typography>
            </Box>
            <Box my={2}>
                <Typography variant='h6' align='center'>
                    Thanks for that - now that we're done with the onboarding, you can actually use
                    the app.
                </Typography>
            </Box>
            <Button onClick={onGoToDashboard} variant='contained' color='primary' fullWidth>
                Go to Dashboard
            </Button>
        </CenteredContainer>
    );
};
