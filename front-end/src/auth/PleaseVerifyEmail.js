import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { post } from '../network';
import { useQueryParams } from '../routing';
import {
    Alert,
    Button,
    CenteredContainer,
    Typography,
} from '../ui';

export const PleaseVerifyEmail = () => {
    const { userId } = useParams();
    const { variant = 0 } = useQueryParams();
    const [resent, setResent] = useState(false);

    const resend = async () => {
        await post(`/api/resend-verification/${userId}`);
        setResent(true);
        setTimeout(() => {
            setResent(false);
        }, 2000);
    }
    
    const afterCreateAccount = (
        <>
        <h1>Account Created!</h1>
        <h3>Just verify your email address to continue</h3>
        {resent && <Alert severity="success">Verification email resent!</Alert>}
        <Button
            onClick={() => { if (!resent) resend() }}
            color="primary"
            variant="contained"
        >Resend verification email</Button>
        </>
    );

    const triedToSignInWithoutVerifying = (
        <>
        <h1>Please Verify Your Email Address</h1>
        <h3>It looks like you've already got an account, but you need to verify your email address before you can use the site</h3>
        {resent && <Alert severity="success">Verification email resent!</Alert>}
        <Button
            onClick={() => { if (!resent) resend() }}
            color="primary"
            variant="contained"
        >Resend verification email</Button>
        </>
    );

    const variantMap = {
        '0': afterCreateAccount,
        '1': triedToSignInWithoutVerifying,
    };

    return (
        <CenteredContainer maxWidth="sm">
            <Typography align="center">
                {variantMap[variant] || null}
            </Typography>
        </CenteredContainer>
    );
}