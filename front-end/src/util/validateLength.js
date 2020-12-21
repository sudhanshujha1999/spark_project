export const validateLength = (fieldName, minLength, errorMessage) => ({
    test: fields => fields[fieldName] && fields[fieldName].length >= minLength,
    errorMessage: errorMessage || `${fieldName} must be ${minLength} characters or longer`,
})