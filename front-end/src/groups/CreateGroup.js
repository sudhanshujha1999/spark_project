import { useState } from "react";
import { Alert, Box, Button, Grid, Loading, MenuItem, TextField, Typography } from "../ui";
import { UsaStates } from "usa-states";
import { getValidationErrors } from "../util/getValidationErrors";
import { post } from "../network";

const usaStates = new UsaStates();

const validations = [
    {
        test: ({ name }) => name.length > 1,
        errorMessage: "Group name must be 2 characters or longer",
    },
    {
        test: ({ description }) => description.length > 5,
        errorMessage: "Please add a description for more than 5 words",
    },
    {
        test: ({ state }) => state !== "",
        errorMessage: "Please select a location",
    },
];

export const CreateGroup = ({ onClose }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedState, setSelectedState] = useState(""); // As in "USA State", NOT "React state"
    // error
    const [validationErrors, setValidationErrors] = useState([]);
    // loading
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        const deatils = {
            name,
            description,
            state: selectedState,
        };
        const validationErrors = getValidationErrors(deatils, validations);
        setValidationErrors(validationErrors);
        if (validationErrors.length > 0) return;
        // loading
        setLoading(true);
        try {
            const { data } = await post("/api/community-group/", deatils);
            console.log(data);
            onClose();
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
        // loading
    };

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h4'>Create your group</Typography>
                    <Typography variant='subtitle2' gutterBottom>
                        Connect your organizaiton with others in a group
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Group Name'
                        variant='outlined'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        label='Description'
                        multiline
                        fullWidth
                        rows={4}
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id='standard-select-currency'
                        select
                        fullWidth
                        label='Select'
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}>
                        {usaStates.states.map((usaState) => (
                            <MenuItem key={usaState.name} value={usaState.name}>
                                {usaState.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    {validationErrors.map((error) => (
                        <Box mb={2}>
                            <Alert severity='error'>{error}</Alert>
                        </Box>
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <Button
                        disabled={loading}
                        onClick={handleCreate}
                        fullWidth
                        color='primary'
                        variant='contained'>
                        {loading ? <Loading height='fit-content' size='2em' /> : "Create"}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};
