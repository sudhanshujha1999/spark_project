import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    DatePicker,
    Divider,
    Grid,
    TextField,
    Typography,
} from "../ui";
import { useState, useEffect } from "react";
import { useTeam } from "../teams";
import { useStyles } from "./styles";
import { isEmail } from "../util";
import { mapsData as maps } from "./mapsData";

export const AddWarRoomSession = ({ handleCancel, teams }) => {
    const [sessionName, setSessionName] = useState("");
    // Needs to be from a Select Menu
    const [gameName, setGameName] = useState("");
    const [teamName, setTeamName] = useState("");
    const [map, setMap] = useState({});
    const [date, setDate] = useState("");
    const [searchTeam, setSearchTeam] = useState(null);
    const [opponentTeam, setOpponentTeam] = useState("");
    const [loadingTeam, setLoadingTeam] = useState(false);
    const [player, setPlayer] = useState("");
    const [players, setPlayers] = useState([]);
    const [teamId, setTeamId] = useState("123");
    const { isLoading: isLoadingTeam, team } = useTeam(teamId);
    const classes = useStyles();

    const handleAdd = () => {
        if (!teamName || !players || !gameName || !opponentTeam || !sessionName || !date || map) {
            console.log("fill All fields");
            return;
        }
        console.log(date);
        console.log("PRoceed");
    };

    useEffect(() => {
        if (teams) {
            let arrayTeam = [];
            teams.forEach((item) => (arrayTeam[`${item.name}`] = item));
            setSearchTeam(arrayTeam);
        }
    }, [teams]);

    useEffect(() => {
        if (searchTeam && searchTeam[teamName]) {
            console.log(searchTeam[teamName].id);
            setLoadingTeam(true);
            setTeamId(searchTeam[teamName].id);
        } else {
            setTeamId(null);
        }
    }, [teamName, searchTeam]);

    useEffect(() => {
        if (team) {
            if (team.name === teamName) setLoadingTeam(false);
        }
        if (team === null) {
            setLoadingTeam(false);
        }
        // eslint-disable-next-line
    }, [team]);

    const onClickRoster = (roster) => {
        if (roster.players.length > 0) {
            roster.players.forEach((player) => {
                if (!players.some((item) => item === player.email)) {
                    setPlayers([...players, player.email]);
                }
            });
        }
    };

    const addPlayer = () => {
        if (isEmail(player)) {
            if (!players.some((item) => item === player)) {
                setPlayers([...players, player]);
                setPlayer("");
            }
        }
    };

    const selectMap = (map) => {
        setMap(map);
    };

    return (
        <Box className={classes.addSessionContainer}>
            <Grid container spacing={4}>
                {/* SESSION INFO */}
                <Grid item xs={12}>
                    <Typography className={classes.sessionHeading}>Add session details</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        className={classes.sessionTextfield}
                        label='Session Name'
                        variant='outlined'
                        value={sessionName}
                        onChange={(e) => setSessionName(e.target.value)}
                        fullWidth
                    />
                    <Autocomplete
                        freeSolo
                        value={gameName}
                        options={teams.map((option) => option.game)}
                        onChange={(e, option) => {
                            option && setGameName(option);
                        }}
                        renderInput={(params) => (
                            <TextField
                                onChange={(e) => setGameName(e.target.value)}
                                variant='outlined'
                                className={classes.sessionTextfield}
                                {...params}
                                label='Game Name'
                                margin='normal'
                            />
                        )}
                    />
                    <Autocomplete
                        freeSolo
                        value={teamName}
                        options={teams.map((option) => option.name)}
                        onChange={(e, option) => {
                            if (option) {
                                setTeamName(option);
                                setGameName(searchTeam[option].game);
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                onChange={(e) => setTeamName(e.target.value)}
                                variant='outlined'
                                className={classes.sessionTextfield}
                                {...params}
                                label='Team Name'
                                margin='normal'
                            />
                        )}
                    />
                    <TextField
                        variant='outlined'
                        className={classes.sessionTextfield}
                        label='Opponent Name'
                        value={opponentTeam}
                        onChange={(e) => setOpponentTeam(e.target.value)}
                        fullWidth
                    />
                    <Box>
                        <Typography className={classes.subtitle}> Pick date for session</Typography>
                        <DatePicker value={date} setValue={(value) => setDate(value)} />
                    </Box>
                </Grid>

                {/* PLAYERS */}
                <Grid item xs={12} md={6}>
                    <Box>
                        <Typography variant='h6'>Add players for session</Typography>
                    </Box>
                    {players.length > 0 &&
                        players.map((player) => (
                            <Typography className={classes.players}>{player}</Typography>
                        ))}
                    {teamId && (
                        <Box>
                            <Typography variant='body1' className={classes.subtitle}>
                                Add from rosters
                            </Typography>
                            {loadingTeam ? (
                                <Box className={classes.rosterLoading}>
                                    <CircularProgress color='secondary' />
                                </Box>
                            ) : team.rosters && team.rosters.length > 0 ? (
                                team.rosters.map((roster) => (
                                    <Box
                                        onClick={() => onClickRoster(roster)}
                                        className={classes.rosterName}>
                                        <Typography>{roster.name}</Typography>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant='subtitle2'>No rosters found</Typography>
                            )}
                            <Box my={1} />
                            <Divider />
                        </Box>
                    )}
                    <Box my={2} className={classes.addPlayerBox}>
                        <TextField
                            value={player}
                            fullWidth
                            onChange={(e) => setPlayer(e.target.value)}
                            variant='outlined'
                            className={classes.sessionTextfield}
                            label='Player email'
                        />
                        <Button onClick={addPlayer} variant='outlined' color='primary'>
                            Add player
                        </Button>
                    </Box>
                </Grid>

                {/* MAPS */}
                <Grid item xs={12} className={classes.row}>
                    {maps.map((mapItem) => (
                        <Box className={classes.map} onClick={() => selectMap(mapItem)}>
                            <Box
                                className={
                                    mapItem.name === map.name
                                        ? `${classes.mapImage} ${classes.activeMap}`
                                        : classes.mapImage
                                }
                                style={{
                                    backgroundImage: `url(${mapItem.map})`,
                                }}
                            />
                            <Typography className={classes.subtitle}>{mapItem.name}</Typography>
                        </Box>
                    ))}
                </Grid>

                {/* ACTIONS */}
                <Grid container item xs={12} sm={6} spacing={4}>
                    <Grid item xs={6} sm={4}>
                        <Button
                            fullWidth
                            onClick={handleCancel}
                            className={classes.deleteBtn}
                            variant='contained'
                            color='primary'>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Button fullWidth onClick={handleAdd} variant='contained' color='primary'>
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};
