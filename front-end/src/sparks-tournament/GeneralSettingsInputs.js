import { Box, Button, Grid, TextField, Typography } from "../ui";
import { IOSSwitch as Switch } from "../ui/SwitchiOs";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { setEditTournamentValuesState, tournamentState } from "./recoil";
import { useEffect } from "react";

export const GeneralSettingsInputs = ({ saveFunction }) => {
    const {
        name: initialName,
        description: initialDescription,
        publishable: initialPublishable,
    } = useRecoilValue(tournamentState);
    const [name, setName] = useState(initialName);
    const [description, setDescription] = useState(initialDescription || "");
    const [publishable, setPublishable] = useState(initialPublishable || false);
    const setEditValues = useSetRecoilState(setEditTournamentValuesState);

    useEffect(() => {
        setName(initialName);
        setDescription(initialDescription);
        setPublishable(initialPublishable);
        console.log(initialPublishable);
    }, [initialDescription, initialName, initialPublishable]);

    const handleChangeGlobalState = (value, fieldName) => {
        if (!fieldName) {
            console.log("no-name-for-field");
        }
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

    const handlePublishableChange = (value) => {
        setPublishable(value);
        handleChangeGlobalState(value, "publishable");
    };

    const save = () => {
        saveFunction();
    };

    return (
        <Box maxWidth='500px'>
            <Grid container rowSpacing={5}>
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
                <Grid xs={12}>
                    <Box mt={4} display='flex' alignItems='center'>
                        <Box mr={2}>
                            <Switch
                                checked={publishable}
                                onChange={(e) => handlePublishableChange(e.target.checked)}
                            />
                        </Box>
                        <Typography variant='subtitle2'>Publish</Typography>
                    </Box>
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
