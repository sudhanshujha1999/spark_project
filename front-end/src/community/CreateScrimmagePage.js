import { Alert, Autocomplete, Box, Button, DatePicker, Grid, TextField, Typography } from "../ui";
import { useMemo, useState } from "react";
import { useOrganizations } from "../teams";
import { getValidationErrors } from "../util";
import { post } from "../network";
import { StyledSlider } from "./StyledSlider";

const validations = [
    {
        test: ({ game }) => game.length > 0,
        errorMessage: "Please select a game",
    },
    {
        test: ({ startDate }) => startDate !== "",
        errorMessage: "Please select a date",
    },
];

export const CreateScrimmagePage = ({ whenComplete = () => console.log("complete") }) => {
    const [game, setGame] = useState("");
    const [skillLevel, setSkillLevel] = useState(4);
    const [startDate, setStartDate] = useState("");
    const { organizations } = useOrganizations();
    const [errors, setErrors] = useState([]);
    const teams = useMemo(() => {
        return organizations.teams ? organizations.teams : [];
    }, [organizations]);
    const handlePost = async () => {
        const allTeamsWithSelectedGame = teams
            .filter((team) => team.game === game)
            .map((team) => team._id);
        const reqObject = {
            game,
            startDate,
            organizationId: organizations._id,
            teams: allTeamsWithSelectedGame,
            skillLevel,
        };
        const errors = getValidationErrors(reqObject, validations);
        setErrors(errors);
        if (errors.length > 0) {
            return;
        }
        const {
            data: { scrimmageId },
        } = await post(`/api/scrimmage/`, reqObject);
        // push to that id page or community
        whenComplete();
        console.log(scrimmageId);
    };

    return (
        <Box>
            <Grid container>
                <Grid item xs={6}>
                    {errors.map((error) => (
                        <Box my={1}>
                            <Alert variant='outlined' severity='error'>
                                {error}
                            </Alert>
                        </Box>
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        value={game}
                        options={teams.map((option) => option.game)}
                        onChange={(e, option) => {
                            if (option) {
                                setGame(option);
                            } else {
                                setGame(null);
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
                </Grid>
                <Grid item xs={12}>
                    <Box my={2}>
                        <Box mb={2}>
                            <Typography variant='subtitle2' gutterBottom>
                                Pick start date for scrimmage
                            </Typography>
                        </Box>
                        <DatePicker value={startDate} setValue={(value) => setStartDate(value)} />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box my={2}>
                        <Box mb={2}>
                            <Typography variant='subtitle2' gutterBottom>
                                Pick your teams skill level
                            </Typography>
                        </Box>
                        <StyledSlider value={skillLevel} setValue={setSkillLevel} />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' color='secondary' onClick={handlePost}>
                        Post
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};
