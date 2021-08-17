import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    DatePicker,
    Divider,
    Grid,
    IconButton,
    TextField,
    Typography,
} from "../ui";
import { post } from "../network";
import { ClearIcon } from "../icons";
import { useState, useEffect, useMemo } from "react";
import { useTeam } from "../teams";
import { useStyles } from "./styles";
import { mapsData as maps } from "./mapsData";
import { useHistory } from "react-router-dom";
import { MenuItem } from "@material-ui/core";

export const AddWarRoomSession = ({ handleCancel, teams }) => {
    const [sessionName, setSessionName] = useState("");
    // Needs to be from a Select Menu
    // fields to fill
    const [gameName, setGameName] = useState("");
    const [teamName, setTeamName] = useState("");
    const [map, setMap] = useState({});
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [opponentTeam, setOpponentTeam] = useState("");
    const [selectedMapGame, setSelectedMApGame] = useState("");
    // used in processing
    const [searchTeam, setSearchTeam] = useState(null);
    const [saving, setSaving] = useState(false);
    const [players, setPlayers] = useState([]);
    const [teamId, setTeamId] = useState(null);
    const { team, isLoading } = useTeam(teamId);
    const history = useHistory();
    const classes = useStyles();

    const handleAdd = async () => {
        if (!teamName || !gameName || !opponentTeam || !sessionName || !date || !map) {
            console.log("fill All fields");
            return;
        }
        const warRoomObject = {
            team: teamName,
            game: gameName,
            description,
            opponentTeam: opponentTeam,
            eventName: sessionName,
            eventDate: date,
            mapName: map.name,
            mapLink: map.link,
            invitees: players,
        };
        setSaving(true);
        try {
            const {
                data: { sessionId },
            } = await post("/api/war-room", warRoomObject);
            console.log(sessionId);
            // REGISTER THE WAR ROOM SESSION AND MAKE INVITES FOR ALL THE PLAYERS
            history.push(`/war-room/${sessionId}/session`);
        } catch (error) {
            console.log(error.message);
        }
        setSaving(false);
    };

    useEffect(() => {
        if (teams) {
            let arrayTeam = {};
            teams.forEach((item) => (arrayTeam[`${item.name}`] = item));
            setSearchTeam(arrayTeam);
        }
    }, [teams]);

    useEffect(() => {
        if (searchTeam && searchTeam[teamName]) {
            setTeamId(searchTeam[teamName]._id);
        } else {
            setTeamId(null);
        }
    }, [teamName, searchTeam]);

    const onClickRoster = (roster) => {
        if (roster.players.length > 0) {
            const newPlayers = roster.players.filter(
                (player) => !players.some((addedPlayers) => addedPlayers.email === player.email)
            );
            setPlayers([...players, ...newPlayers]);
        }
    };

    const selectMap = (map) => {
        setMap(map);
    };

    const handleRemove = (playerToRemove) => {
        setPlayers(players.filter((playerItem) => playerItem !== playerToRemove));
    };

    const memoizedGroupedMaps = useMemo(() => {
        // made the maps like that cause in future if we want to add maps db
        // then we can enter a new map with the groupid and map details and we will
        // modify the data here as we need
        let groupedMaps = {};
        maps.forEach((map) => {
            if (!groupedMaps[`${map.groupId}`]) {
                const mapObject = {
                    id: map.groupId,
                    name: map.groupName,
                    maps: [],
                };
                mapObject.maps.push({
                    name: map.name,
                    link: map.link,
                });
                groupedMaps[`${map.groupId}`] = mapObject;
            } else {
                groupedMaps[`${map.groupId}`].maps.push({
                    name: map.name,
                    link: map.link,
                });
            }
        });
        return groupedMaps;
    }, []);

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
                        value={teamName}
                        options={teams
                            .filter((option) => option.editEvents)
                            .map((option) => option.name)}
                        onChange={(e, option) => {
                            if (option) {
                                setTeamName(option);
                                setGameName(searchTeam[option].game);
                            } else {
                                setTeamName(null);
                                setGameName(null);
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                variant='outlined'
                                className={classes.sessionTextfield}
                                {...params}
                                label='Team Name'
                                margin='normal'
                            />
                        )}
                    />
                    <Autocomplete
                        value={gameName}
                        options={teams
                            .filter((option) => option.editEvents)
                            .map((option) => option.game)}
                        onChange={(e, option) => {
                            if (option) {
                                setGameName(option);
                            } else {
                                setGameName(null);
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                variant='outlined'
                                className={classes.sessionTextfield}
                                {...params}
                                label='Game Name'
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
                    <TextField
                        value={description}
                        className={classes.sessionTextfield}
                        onChange={(e) => setDescription(e.target.value)}
                        label='Description'
                        multiline
                        placeholder='What will be main topic of this sesson'
                        defaultValue=''
                        fullWidth
                        rows={4}
                        variant='outlined'
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
                            <Box className={classes.players}>
                                <Typography>{player.email}</Typography>
                                <IconButton size='small' onClick={() => handleRemove(player)}>
                                    <ClearIcon fontSize='small' />
                                </IconButton>
                            </Box>
                        ))}
                    {teamId && (
                        <Box>
                            <Typography variant='body1' className={classes.subtitle}>
                                Add from rosters
                            </Typography>
                            {isLoading ? (
                                <Box className={classes.rosterLoading}>
                                    <CircularProgress color='secondary' />
                                </Box>
                            ) : team.rosters && team.rosters.length > 0 ? (
                                team.rosters.map(
                                    (roster) =>
                                        roster.players.length > 0 && (
                                            <Box
                                                my={2}
                                                onClick={() => onClickRoster(roster)}
                                                className={classes.rosterName}>
                                                <Typography>
                                                    {roster.name === "DEFAULT_ROSTER"
                                                        ? "Free Players"
                                                        : roster.name}
                                                </Typography>
                                            </Box>
                                        )
                                )
                            ) : (
                                <Typography variant='subtitle2'>No rosters found</Typography>
                            )}
                            <Box my={1} />
                            <Divider />
                        </Box>
                    )}
                </Grid>

                {/* MAPS */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        select
                        label='Game'
                        variant='outlined'
                        fullWidth
                        value={selectedMapGame}
                        className={classes.sessionTextfield}
                        onChange={(e) => {
                            setSelectedMApGame(e.target.value);
                        }}>
                        {Object.values(memoizedGroupedMaps).map(({ name, id }) => (
                            <MenuItem key={id} value={id}>
                                {name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    {selectedMapGame && (
                        <Box display='flex' flexDirection='row' flexWrap='wrap'>
                            {memoizedGroupedMaps[`${selectedMapGame}`].maps.map((mapItem) => (
                                <Box className={classes.map} onClick={() => selectMap(mapItem)}>
                                    <Box
                                        className={
                                            mapItem.name === map.name
                                                ? `${classes.mapImage} ${classes.activeMap}`
                                                : classes.mapImage
                                        }
                                        style={{
                                            backgroundImage: `url(${mapItem.link})`,
                                        }}
                                    />
                                    <Typography className={classes.subtitle}>
                                        {mapItem.name}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Grid>

                {/* ACTIONS */}
                <Grid container item xs={12} sm={6} spacing={4}>
                    <Grid item xs={6} sm={4}>
                        <Button
                            fullWidth
                            onClick={handleCancel}
                            className={classes.deleteBtn}
                            variant='contained'>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Button
                            fullWidth
                            disabled={saving}
                            onClick={handleAdd}
                            variant='contained'
                            color='primary'>
                            {saving ? <CircularProgress color='secondary' /> : "Add"}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};
