import Grid from '@material-ui/core/Grid';
import {
    Box,
} from '../ui'

export const RoleSelector = ({ options, selectedOption, onChange }) => (
    <>
    {options.map(option => (
        <Grid item xs={6} onClick={() => onChange(option)} >
            <Box style={{
                alignItems: 'center',
                backgroundColor: selectedOption && selectedOption.value === option.value ? 'rgba(70, 70, 70, 1)' : 'inherit',
                border: `1px solid ${selectedOption && selectedOption.value === option.value ? 'white' : 'rgba(255, 255, 255, 0.23)'}`,
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'inline-flex',
                height: '100px',
                justifyContent: 'center',
                width: '100%',
            }}>
                <div>{option.displayText}</div>
            </Box>
        </Grid>
    ))}
    </>
);