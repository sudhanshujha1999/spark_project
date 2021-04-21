import {
    Box,
    Button,
    Dialog,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    TextField,
} from "../ui";
import { useStyles } from "./Styles";
import { useState } from "react";

export const LeagueRecords = ({ teams }) => {
    const classes = useStyles();
    const [leagues, setLeagues] = useState([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const [info, setInfo] = useState("");

    const handleClick = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        setLeagues([
            ...leagues,
            {
                team: selected,
                leagueInfo: info,
            },
        ]);
        onClose();
    };

    return (
        <>
            <Grid container spcing={4}>
                <Grid item xs={12}>
                    <Typography variant='h5' gutterBottom>
                        League Records
                    </Typography>
                    <Box className={`${classes.newsContainer} ${classes.customScroll}`}>
                        {leagues.length > 0 ? (
                            leagues.map(({ team, leagueInfo }, index) => {
                                return (
                                    <Grid item xs={12}>
                                        <Box className={classes.newsBox}>
                                            <Typography variant='subtitle2' gutterBottom>
                                                {team}
                                            </Typography>
                                            <Typography variant='body1'>{leagueInfo}</Typography>
                                        </Box>
                                    </Grid>
                                );
                            })
                        ) : (
                            <Grid item xs={12}>
                                <Box className={classes.newsBox}>
                                    <Typography variant='h5'>No league info</Typography>
                                </Box>
                            </Grid>
                        )}
                    </Box>
                    <Box className={classes.overlay} />
                    <Box my={2}>
                        <Button color='secondary' onClick={handleClick} variant='contained'>
                            Add a league
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={onClose}>
                <Box className={classes.dialog}>
                    <Typography variant='h6'>Add league info</Typography>
                    <FormControl className={classes.selectField} variant='outlined' color='primary'>
                        <InputLabel className={classes.label}>Team</InputLabel>
                        <Select
                            disableUnderline
                            MenuProps={{ disableScrollLock: true }}
                            labelId='select-filled-label'
                            value={selected}
                            onChange={(e) => setSelected(e.target.value)}>
                            <MenuItem value=''>
                                <em>None</em>
                            </MenuItem>
                            {teams.map((team) => (
                                <MenuItem value={team.name}>{team.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        value={info}
                        label='Leaguse Data'
                        fullWidth
                        onChange={(e) => setInfo(e.target.value)}
                        variant='outlined'
                        color='primary'
                    />
                    <Box my={2}>
                        <Button onClick={handleAdd} variant='outlined' color='secondary'>
                            Add
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
};
