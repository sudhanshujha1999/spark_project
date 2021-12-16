import { Box, Button, CustomSnackbar, Grid, Loading, Typography, TextField } from "../ui";
import { useEffect, useState } from "react";
import { useStyles } from "./styles";
import {
    basicTournamentInformationState,
    gameForTournamentState,
    basicTournamentInformationSelector,
} from "./recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ArrowBackIcon } from "../icons";
import { useCallback } from "react";

export const TournamentInformation = ({
    nextFunction = () => console.log("next-function"),
    prevFunction = () => console.log("prev-function"),
    finishFunction = () => console.log("finish-function"),
    isLoading = false,
}) => {
    const basicInfo = useRecoilValue(basicTournamentInformationState);
    const setBasicInfo = useSetRecoilState(basicTournamentInformationSelector);
    const { img: gameImage } = useRecoilValue(gameForTournamentState);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const classes = useStyles();

    useEffect(() => {
        if (basicInfo?.name) {
            setName(basicInfo?.name);
        }
        // eslint-disable-next-line
    }, []);

    const handleChange = (valueName, value) => {
        setBasicInfo({ fieldName: valueName, value });
    };

    const handleNameChange = (name) => {
        setName(name);
        handleChange("name", name);
    };

    const onFinish = useCallback(() => {
        if (!name) {
            setError("Please enter a name");
        }
        setError("");
        finishFunction();
    }, [finishFunction, name]);

    const onPrev = () => {
        prevFunction();
    };

    return (
        <Box>
            <Box>
                <Typography variant='h4'>Enter basic information</Typography>
            </Box>
            <Box zIndex='1' position='relative' height='250px' mt={3} overflow='hidden'>
                <Box
                    className={classes.gameImage}
                    style={{
                        backgroundImage: `url(${gameImage})`,
                    }}
                />
            </Box>
            <Grid
                className={`${classes.gamesContainer} ${classes.customScrollY}`}
                container
                my={1}
                spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label='Tournament name'
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Box my={3} display='flex' alignItems='center' justifyContent='space-between'>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={onPrev}
                    color='secondary'
                    variant='outlined'>
                    Prev
                </Button>
            </Box>
            <Box my={1}>
                <Button
                    disabled={isLoading}
                    fullWidth
                    onClick={onFinish}
                    variant='contained'
                    color='primary'>
                    {isLoading ? <Loading height='fit-content' size='1.8em' /> : "Finish"}
                </Button>
            </Box>
            <CustomSnackbar message={error} setMessage={setError} type='error' />{" "}
        </Box>
    );
};
