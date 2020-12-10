import { useState } from 'react';
import TextField from '@material-ui/core/TextField';

/*
    const fields = [
        { label: 'First Name', stateName: 'firstName', type: 'text', default: '' },
        { label: 'Password', stateName: 'password', type: 'password', default: '' },
        { label: 'Confirm Password', stateName: 'confirmPassword', type: 'password', default: '' },
        ...
    ]
    
    const validations = [{
        test: ({ password, confirmPassword }) => password === confirmPassword,
        errorMessage: 'Passwords most match',
    }, {
        test: ({ firstName }) => firstName.length > 1,
        errorMessage: 'First name must be 2 characters or longer',
    },
    ...
    ];
*/
const zip = (keys, values) =>
    keys.reduce((acc, key, i) => ({
        ...acc,
        [key]: values[i],
    }), {});

export const StateForm = ({
    fields = [],
    validations = [],
    onChange = () => {},
}) => {
    const initialState = zip(
        fields.map(field => field.stateName),
        fields.map(field => field.default),
    ); // transform the "fields" array into the initial value of the state
    const [formState, setFormState] = useState(initialState);

    const updateField = (fieldName, newValue) => {
        setFormState({ ...formState, [fieldName]: newValue });
        const errors = validations
            .filter(validation => !validation(formState)) // get all failing validations
            .map(validation => validation.errorMessage); // get the error messages of the failing validations
        onChange({ formState, errors }); // call the onChange callback with the updated state and any errors
    }

    return (
    <>
        {fields.map(({ label, stateName, type })=> (
            <TextField
                value={formState[stateName]}
                onChange={e => updateField(stateName, e.target.value)}
                fullWidth
                label={label}
                type={type}
                variant="outlined" />
        ))}
    </>
    );
}