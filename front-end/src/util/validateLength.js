export const validateLength = (fieldName, minLength, errorMessage) => ({
    test: (fields) => fields[fieldName] && fields[fieldName].length >= minLength,
    errorMessage:
        errorMessage || `${formatSting(fieldName)} must be ${minLength} characters or longer`,
});

const formatSting = (string) => {
    let formattedString = "";
    for (let i = 0; i < string.length; i++) {
        if (i === 0) {
            formattedString += string.charAt(i).toUpperCase();
        } else if (
            string.charAt(i + 1) &&
            string.charAt(i + 1).toLowerCase() !== string.charAt(i + 1)
        ) {
            formattedString += `${string.charAt(i)} `;
        } else {
            formattedString += string.charAt(i);
        }
    }
    formattedString += string.charAt(string.length);
    return formattedString;
};
