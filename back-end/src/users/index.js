import { createUserRoute } from './createUserRoute';
import { resendVerificationEmailRoute } from './resendVerificationEmailRoute';
import { updateUserRoute } from './updateUserRoute';
import { verifyEmailRoute } from './verifyEmailRoute';

export const routes = [
    createUserRoute,
    resendVerificationEmailRoute,
    updateUserRoute,
    verifyEmailRoute,
];