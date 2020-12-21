import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import {
    Box,
    Button,
    CenteredContainer,
} from '../ui';
import { useQueryParams } from '../routing';

const resultCodesMap = {
    ok: {
        heading: 'Verification Successful!',
        message: 'Now you just need to sign in and you\'ll be on your way',
        buttonText: 'Sign-in',
        linkUrl: '/sign-in',
    },
    err: {
        heading: 'Uh oh! Something went wrong...',
        message: 'We\'re not quite sure what it was, but maybe try again later?',
        buttonText: 'Back to Sign-in',
        linkUrl: '/sign-in',
    },
    not_found: {
        heading: 'Hmm... we couldn\'t find the user you\'re trying to verify',
        message: 'The link you clicked on doesn\'t look quite right, try again',
        buttonText: 'Back to Sign-in',
        linkUrl: '/sign-in',
    },
    already_verified: {
        heading: 'Good news - your email is already verified!',
        message: 'Now you just need to sign in and you\'ll be on your way',
        buttonText: 'Sign In',
        linkUrl: '/sign-in',
    },
    no_code: {
        heading: 'Not sure how you got here, but something\'s not right',
        message: 'Let\'s just get you back to the sign-in page where you belong',
        buttonText: 'Back to Sign-in',
        linkUrl: '/sign-in',
    },
};

export const EmailVerificationResult = () => {
    const { code } = useQueryParams();
    const history = useHistory();
    
    useEffect(() => firebase.auth().signOut());

    const displayData = resultCodesMap[code || 'no_code'];
    const {
        heading,
        message,
        buttonText,
        linkUrl,
    } = displayData;

    return (
        <CenteredContainer>
            <Box align="center">
                <h1>{heading}</h1>
                <p>{message}</p>
                <Button
                    onClick={() => history.push(linkUrl)}
                    variant="contained"
                    color="primary"
                >{buttonText}</Button>
            </Box>
        </CenteredContainer>
    );
}