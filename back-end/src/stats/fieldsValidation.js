import { VALID_FIELD_TYPES } from "../models";

export const fieldsValidation = (fields) => {
    // might change in future once we have more fields
    return fields.every(
        ({ name, field_type }) => name !== "" && VALID_FIELD_TYPES.includes(field_type)
    );
};
