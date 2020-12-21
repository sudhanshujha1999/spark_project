export const getValidationErrors = (fields, validations) => {
    const errors = validations
        .filter(validation => !validation.test(fields))
        .map(validation => validation.errorMessage);
    return errors;
}