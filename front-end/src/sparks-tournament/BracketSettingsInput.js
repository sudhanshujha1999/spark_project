import { Box, Button, Grid, MenuItem, TextField } from "../ui";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { setEditTournamentValuesState, tournamentState } from "./recoil";
import { useEffect } from "react";
import { useCallback } from "react";

export const BracketSettingsInput = ({ saveFunction }) => {
    const { max_teams: initialMaxTeams, min_teams: initialMinTeams } =
        useRecoilValue(tournamentState);
    const [maxTeams, setMaxTeams] = useState(initialMaxTeams || 4);
    const [minTeams, setMinTeams] = useState(initialMinTeams || 4);
    const setEditValues = useSetRecoilState(setEditTournamentValuesState);

    const handleChangeGlobalState = useCallback(
        (value, fieldName) => {
            if (!fieldName) {
                console.log("no-name-for-field");
                return;
            }
            setEditValues({ name: fieldName, value });
        },
        [setEditValues]
    );

    const handleSave = () => {
        console.log("save-bracket");
        saveFunction();
    };

    const handleMinTeams = useCallback(
        (value) => {
            if (value > maxTeams) {
                return;
            } else {
                setMinTeams(value);
                handleChangeGlobalState(value, "min_teams");
            }
        },
        [maxTeams, handleChangeGlobalState]
    );

    const handleMaxTeams = useCallback(
        (value) => {
            setMaxTeams(value);
            handleChangeGlobalState(value, "max_teams");
        },
        [handleChangeGlobalState]
    );

    useEffect(() => {
        if (initialMinTeams) {
            setMinTeams(initialMinTeams);
        } else {
            handleMinTeams(4);
        }
        if (initialMaxTeams) {
            setMaxTeams(initialMaxTeams);
        } else {
            handleMaxTeams(4);
        }
        // eslint-disable-next-line
    }, [initialMinTeams, initialMaxTeams]);

    return (
        <Box maxWidth='500px'>
            <Grid container rowSpacing={3} columnSpacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={minTeams}
                        type='number'
                        onChange={(e) => handleMinTeams(e.target.value)}
                        fullWidth
                        label='Minimum number of teams'
                        variant='outlined'
                        color='primary'
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id='outlined-select-currency'
                        select
                        label='Maximum number of teams'
                        value={maxTeams}
                        onChange={(e) => handleMaxTeams(e.target.value)}
                        fullWidth>
                        {new Array(4).fill(2).map((value, index) => (
                            <MenuItem key={index} value={Math.pow(2, index + value)}>
                                {Math.pow(2, index + value)}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={handleSave} color='primary' variant='contained'>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};
