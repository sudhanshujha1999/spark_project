import { Box, Button, Grid, TextField } from "../ui";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tournamentEditState, tournamentState } from "./recoil";
import { useEffect } from "react";

export const GeneralSettingsInputs = ({ saveFunction }) => {
    const { name: initialName, description: initialDescription } = useRecoilValue(tournamentState);
    const [name, setName] = useState(initialName);
    const [description, setDescription] = useState(initialDescription || "");
    const setEditValues = useSetRecoilState(tournamentEditState);

    useEffect(() => {
        setName(initialName);
        setDescription(initialDescription);
    }, [initialDescription, initialName]);

    const handleChangeGlobalState = (value, fieldName) => {
        if (!fieldName) {
            console.log("no-name-for-field");
        }
        console.log(value);
        setEditValues({ name: fieldName, value });
    };

    const handleNameChange = (value) => {
        setName(value);
        handleChangeGlobalState(value, "name");
    };

    const handleDescriptionChange = (value) => {
        setDescription(value);
        handleChangeGlobalState(value, "description");
    };

    const save = () => {
        saveFunction();
    };

    return (
        <Box maxWidth='500px'>
            <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        value={name}
                        label='Name'
                        variant='outlined'
                        color='primary'
                        onChange={(e) => handleNameChange(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label='Description'
                        variant='outlined'
                        multiline
                        rows={2}
                        value={description}
                        color='primary'
                        onChange={(e) => handleDescriptionChange(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={save} color='primary' variant='contained'>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};
