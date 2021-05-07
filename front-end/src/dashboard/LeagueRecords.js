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
    IconButton,
} from "../ui";
import { DeleteIcon } from "../icons";
import { useStyles } from "./Styles";
import { useState } from "react";

export const LeagueRecords = ({ teams }) => {
    const classes = useStyles();
    // SET THESE LEAGUES ON THE VALUE OF A HOOK THAT CALL THE DATA
    const [leagues, setLeagues] = useState([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const [info, setInfo] = useState("");
    const [league, setLeague] = useState("");

    const handleClick = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setLeague("");
        setInfo("");
        setSelected("");
    };

    const handleAdd = () => {
        if (selected === "" || league === "" || info === "") {
            // Snackbar to be added
            console.log("Please Enter all Fields");
            return;
        }
        // CAN CHANGE TO DEFAULT MONGO ID OR CAN KEEP IT
        const recorId = Math.floor(100000000 + Math.random() * 900000000);
        const newRecord = {
            id: recorId,
            team: selected,
            leagueName: league,
            record: info,
        };
        setLeagues([...leagues, newRecord]);
        onClose();
    };

    const handleRemove = (removeId) => {
        setLeagues(leagues.filter((leagueRecord) => leagueRecord.id !== removeId));
    };

    return (
        <>
            <Grid container spcing={4}>
                <Grid item xs={12}>
                    <Typography className={classes.headingSection} variant='h5' gutterBottom>
                        League Records
                    </Typography>
                    <Grid
                        container
                        item
                        className={`${classes.newsContainer} ${classes.customScroll}`}>
                        {leagues.length > 0 ? (
                            leagues.map(({ id, leagueName, team, record }, index) => {
                                return (
                                    <Grid key={id} item xs={6}>
                                        <Box className={classes.newsBox}>
                                            <Box className={classes.leagueName}>
                                                <Typography
                                                    className={classes.leagueTitle}
                                                    variant='subtitle2'
                                                    gutterBottom>
                                                    {leagueName}
                                                </Typography>
                                                <Typography
                                                    className={classes.leagueTitle}
                                                    variant='subtitle1'>
                                                    {`(${team})`}
                                                </Typography>
                                            </Box>
                                            <Typography variant='body1'>{record}</Typography>
                                            <IconButton
                                                className={classes.removeBtn}
                                                onClick={() => handleRemove(id)}>
                                                <DeleteIcon fontSize='small' />
                                            </IconButton>
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
                    </Grid>
                    <Box className={classes.overlay} />
                    <Box my={2}>
                        <Button color='secondary' onClick={handleClick} variant='contained'>
                            Add a league
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={onClose}>
                <Box
                    className={classes.dialog}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleAdd();
                        }
                    }}>
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
                        value={league}
                        label='League/Tournament'
                        fullWidth
                        onChange={(e) => setLeague(e.target.value)}
                        variant='outlined'
                        color='primary'
                    />
                    <TextField
                        style={{ margin: "20px 0" }}
                        value={info}
                        label='Record'
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
