import { Autocomplete, Box, Button, Dialog, Grid, Typography, TextField } from "../ui";
import { useStyles } from "./styles";
import { useMemo, useState } from "react";
import { post } from "../network";
import { CircularProgress } from "@material-ui/core";

export const AddLeagueDialog = ({
    open,
    onClose = () => {},
    setLeagues = () => {},
    teams,
    organizationId,
}) => {
    const [gameName, setGameName] = useState("");
    const [teamName, setTeamName] = useState("");
    const [league, setLeague] = useState("");
    const [saving, setSaving] = useState(false);
    const classes = useStyles();

    const searchTeam = useMemo(() => {
        if (teams) {
            let arrayTeam = [];
            teams.forEach((item) => (arrayTeam[`${item.name}`] = item));
            return arrayTeam;
        } else {
            return [];
        }
    }, [teams]);

    const handleAdd = async () => {
        if (teamName === "" || league === "" || gameName === "") {
            // Snackbar to be added
            console.log("Please Enter all Fields");
            return;
        }
        setSaving(true);
        // CAN CHANGE TO DEFAULT MONGO ID OR CAN KEEP IT
        const newRecord = {
            team: teamName,
            game: gameName,
            leagueName: league,
        };
        try {
            await post(`/api/${organizationId}/league`, newRecord);
            setLeagues(true);
            setLeague("");
            setGameName("");
            setTeamName("");
            onClose();
        } catch (error) {
            console.log(error.message);
        }
        setSaving(false);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <Box
                className={classes.dialog}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleAdd();
                    }
                }}>
                <Grid container spacing={5}>
                    <Grid className={classes.leftSide} item xs={12} sm={6}>
                        <Typography
                            className={classes.headingLargeWithoutUnderLine}
                            variant='h6'
                            gutterBottom>
                            Add League Info
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                                    fullWidth
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
                                    fullWidth
                                    {...params}
                                    label='Game Name'
                                    margin='normal'
                                />
                            )}
                        />
                        <TextField
                            value={league}
                            label='League/Tournament'
                            fullWidth
                            onChange={(e) => setLeague(e.target.value)}
                            variant='outlined'
                            margin='normal'
                            color='primary'
                        />
                        <Box my={2}>
                            <Button
                                disabled={saving}
                                fullWidth
                                onClick={handleAdd}
                                variant='outlined'
                                color='secondary'>
                                {saving ? (
                                    <CircularProgress size='1.8em' color='secondary' />
                                ) : (
                                    "Add"
                                )}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Dialog>
    );
};
