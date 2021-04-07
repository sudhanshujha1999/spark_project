import { useState, useEffect } from "react";
import { useStyles } from "./styles";
import {
    // WE WILL NEED IN TIME WHEN WE LOAD PERMISSIONS OF A SINGLE PLAYER
    // CircularProgress,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grow,
    InputLabel,
    Select,
    MenuItem,
    Typography,
} from "../ui";

export const PlayerPermissionSettings = ({
    rosters,
    savePermission = () => console.log("Save The Permissions for the selected Player and the pemissions"),
}) => {
    const classes = useStyles();
    const [selected, setSelected] = useState("");
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        setPermissions([]);
    }, []);

    const handleChange = (e) => {
        if (e.target.checked) {
            setPermissions([...permissions, e.target.value]);
        } else {
            setPermissions(permissions.filter((permission) => permission !== e.target.value));
        }
    };

    return (
        <Box>
            <h1>Players Info</h1>
            <Box>
                <FormControl fullWidth variant='outlined' color='secondary'>
                    <InputLabel id='label'>Player</InputLabel>
                    <Select
                        fullWidth
                        labelId='label'
                        value={selected}
                        MenuProps={{ disableScrollLock: true }}
                        onChange={(e) => setSelected(e.target.value)}
                        label='Player'>
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {rosters.map((roster) => {
                            return roster.players.map((player) => (
                                <MenuItem value={player}>{player.email}</MenuItem>
                            ));
                        })}
                    </Select>
                </FormControl>
            </Box>
            {selected && (
                <Grow in={selected}>
                    <Box my={2}>
                        <Typography variant='h6' gutterBottom color='primary'>
                            {selected.fullName}
                        </Typography>
                        <Typography variant='body1' gutterBottom>
                            {selected.gamerName}
                        </Typography>
                        <Box className={classes.permissions}>
                            <FormControl>
                                <FormGroup row>
                                    {PERMISSIONS.map(({ label, value }) => (
                                        <FormControlLabel
                                            className={classes.checkbox}
                                            control={
                                                <Checkbox
                                                    checked={permissions.includes(value)}
                                                    onChange={handleChange}
                                                    value={value}
                                                />
                                            }
                                            label={label}
                                        />
                                    ))}
                                </FormGroup>
                            </FormControl>
                        </Box>
                        <Box my={2}>
                            <Button
                                className={classes.deleteBtn}
                                onClick={() => setSelected(null)}
                                variant='contained'>
                                Cancel
                            </Button>
                            <Button
                                onClick={() => savePermission()}
                                variant='contained'
                                color='primary'>
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Grow>
            )}
        </Box>
    );
};

const PERMISSIONS = [
    {
        label: "Can view members",
        value: "CAN_VIEW_MEMBERS",
    },
    {
        label: "Can edit members",
        value: "CAN_EDIT_MEMBERS",
    },
    {
        label: "Can view events",
        value: "CAN_VIEW_EVENTS",
    },
    {
        label: "Can view events",
        value: "CAN_EDIT_EVENTS",
    },
    {
        label: "Can view notes",
        value: "CAN_VIEW_NOTES",
    },
    {
        label: "Can view notes",
        value: "CAN_EDIT_NOTES",
    },
];
