import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { post } from '../network';
import firebase from 'firebase/app';
import { useQueryParams } from '../routing';
import {
    Button,
    CenteredContainer,
    CircularProgress,
    Typography,
} from '../ui';

export const InvitationLandingPage = () => {
    const [alreadyHasAccount, setAlreadyHasAccount] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [invitationEmail, setInvitationEmail] = useState('');
    const { code } = useQueryParams();
    const history = useHistory();

    useEffect(() => firebase.auth().signOut(), []);

    useEffect(() => {
        const acceptInvitation = async () => {
            try {
                const response = await post(`/api/invitations/${code}/accept`);
                const { email, isConfirmed } = response.data;
                setAlreadyHasAccount(isConfirmed);
                setInvitationEmail(email);
            } catch (e) {
                setError(e.message);
            }
            setIsLoading(false);
        }

        acceptInvitation();
    }, [code]);

    const onContinue = () => {
        history.push(
            alreadyHasAccount
                ? `/sign-in?email=${invitationEmail}`
                : `/create-account?email=${invitationEmail}&role=player`);
    }

    const onTryAgain = () => {
        window.location.reload(false);
    }

    const loading = (
        <>
        <h1>Loading...</h1>
        <p>
            Hang on, just checking to make sure your invitation is legit...
        </p>
        <CircularProgress />
        </>
    );

    const success = (
        <>
        <h1>Welcome!</h1>
        <p>
            We found your invitation, so you're all set. We'll just need you to
            {alreadyHasAccount ? ' sign in ' : ' create an account '}
            first
        </p>
        <Button
            onClick={onContinue}
            color="primary"
            variant="contained"
        >
            {alreadyHasAccount ? 'Sign In' : 'Create An Account'}
        </Button>
        </>
    );

    const failure = (
        <>
        <h1>Uh oh...</h1>
        <p>Something went wrong with your invitation...</p>
        <p>That's all we know</p>
        <Button
            onClick={onTryAgain}
            color="primary"
            variant="contained"
        >Try Again</Button>
        </>
    );

    return (
        <CenteredContainer>
            <Typography align="center">
                {isLoading
                    ? loading
                    : error
                        ? failure
                        : success}
            </Typography>
        </CenteredContainer>
    );
}