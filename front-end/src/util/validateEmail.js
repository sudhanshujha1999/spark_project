import { isEmail } from './isEmail';

export const validateEmail = fieldName => ({
    test: fields => isEmail(fields[fieldName]),
    errorMessage: 'Please input a valid email address',
});