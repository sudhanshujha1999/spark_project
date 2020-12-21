import { resendVerificationEmailRoute } from './resendVerificationEmailRoute';
import { verifyEmailRoute } from './verifyEmailRoute';

export const routes = [
    resendVerificationEmailRoute,
    verifyEmailRoute,
];

export { sendVerificationEmail } from './sendVerificationEmail';
export { verifyUser } from './verifyUser';