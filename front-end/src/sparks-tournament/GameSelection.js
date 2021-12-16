import { Box, Button, CustomSnackbar, Card, Grid, Typography, TextField } from "../ui";
import { useEffect, useState } from "react";
import { GAMES } from "../teams/defaultGames";
import { useStyles } from "./styles";
import { gameForTournamentState } from "./recoil";
import { useRecoilState } from "recoil";
import { ArrowForwardIcon } from "../icons";

export const GameSelection = ({
    nextFunction = () => console.log("next-function"),
    prevFunction = () => console.log("prev-function"),
}) => {
    const [selectedGame, setSelectedGame] = useRecoilState(gameForTournamentState);
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [gamesToDisplay, setGamesToDisplay] = useState(GAMES);

    const classes = useStyles();

    useEffect(() => {
        if (selectedGame?.name) {
            setName(selectedGame?.name);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const filterGames = (input) => {
            if (input) {
                const newGamesToSelect = GAMES.filter(({ name }) =>
                    name.toLowerCase().includes(input.toLowerCase())
                );
                setGamesToDisplay(newGamesToSelect);
                console.log("input in filter -> " + input);
            } else {
                setGamesToDisplay(GAMES);
            }
        };
        const timeoutValue = setTimeout(() => {
            filterGames(name);
        }, 100);
        return () => {
            clearTimeout(timeoutValue);
        };
    }, [name]);

    const handleClick = (value) => {
        setSelectedGame(value);
        setName(value.name);
    };

    const onNext = () => {
        if (!selectedGame) {
            setError("Select a game");
            console.log("select-a-game");
            return;
        }
        setError("");
        nextFunction();
    };

    return (
        <Box>
            <Box>
                <Typography variant='h4'>Select a game</Typography>
            </Box>
            <Box>
                <TextField
                    value={name}
                    fullWidth
                    variant='outlined'
                    label='Game'
                    onChange={(e) => setName(e.target.value)}
                    margin='normal'
                />
            </Box>
            <Grid className={`${classes.gamesContainer} ${classes.customScrollY}`} container my={1}>
                {gamesToDisplay.map((game) => (
                    <Grid item xs={4}>
                        <Card
                            onClick={() => handleClick(game)}
                            elevation={4}
                            className={`${classes.gameBox} ${
                                game.name === selectedGame.name ? classes.active : ""
                            }`}>
                            <Box className={classes.imageContainer}>
                                <Box
                                    className={`${classes.image} ${classes.overlay}`}
                                    style={{
                                        backgroundImage: `url(${game.img})`,
                                    }}
                                />
                            </Box>
                            <Box className={classes.content}>
                                <Typography className={classes.gameName}>{game.name}</Typography>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box my={3} display='flex' alignItems='center' justifyContent='space-between'>
                <Button
                    endIcon={<ArrowForwardIcon />}
                    onClick={onNext}
                    color='secondary'
                    variant='outlined'>
                    Next
                </Button>
            </Box>
            <CustomSnackbar message={error} setMessage={setError} type='error' />{" "}
        </Box>
    );
};
