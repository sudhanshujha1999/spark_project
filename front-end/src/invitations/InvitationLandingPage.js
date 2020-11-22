import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useQueryParams } from '../routing';

export const InvitationLandingPage = () => {
    const { code } = useQueryParams();

    return (
        <Container>
            <Typography align="center">
                <h1>Welcome {code}!</h1>
                <p>
                    We found your invitation, so you're all set. We just need a few pieces of info to get started
                </p>
                <Button
                    color="primary"
                    variant="contained"
                >Get Started</Button>
            </Typography>
        </Container>
    );
}