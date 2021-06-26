import {
    Box,
    Button,
    CircularProgress,
    DatePicker,
    Grid,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
    TextField,
    Typography,
} from "../ui";
import { useState } from "react";
import { useStyles } from "./styles";
import { post } from "../network";

export const AddMatch = ({ league, successFunction = () => {} }) => {
    const [outcome, setOutcome] = useState(1);
    const [opponent, setOpponent] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState("");
    const [saving, setSaving] = useState(false);
    const classes = useStyles();
    const handleChange = (event) => {
        setOutcome(parseInt(event.target.value));
    };

    const addMatch = async () => {
        const matchDocument = {
            opponent,
            note,
            date,
            win: outcome === 1 && true,
            lose: outcome === 0 && true,
        };
        setSaving(true);
        try {
            const { data } = await post(`/api/${league._id}/league/match`, matchDocument);
            console.log(data);
            successFunction();
        } catch (error) {
            console.log(error.message);
        }
        setSaving(false);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant='h6'>Match info</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    value={opponent}
                    variant='outlined'
                    color='secondary'
                    fullWidth
                    label='Opponent'
                    onChange={(e) => setOpponent(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    value={note}
                    multiline
                    rows={2}
                    fullWidth
                    variant='outlined'
                    color='secondary'
                    label='Note'
                    onChange={(e) => setNote(e.target.value)}
                />
            </Grid>

            <Grid item xs={12}>
                <FormControl component='fieldset'>
                    <FormLabel
                        color='secondary'
                        className={classes.subtitle}
                        style={{ marginBottom: 5 }}
                        component='legend'>
                        Outcome
                    </FormLabel>
                    <RadioGroup
                        className={classes.flexRow}
                        name='outcome'
                        value={outcome}
                        onChange={handleChange}>
                        <FormControlLabel value={0} control={<Radio />} label='Lose' />
                        <FormControlLabel value={1} control={<Radio />} label='Win' />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <Typography className={classes.subtitle} color='secondary'>
                        {" "}
                        Pick date for session
                    </Typography>
                    <DatePicker value={date} setValue={(value) => setDate(value)} />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Button
                    style={{ width: 100 }}
                    disabled={saving}
                    variant='outlined'
                    color='primary'
                    onClick={addMatch}>
                    {saving ? <CircularProgress color='primary' size='2em' /> : "Submit"}
                </Button>
            </Grid>
        </Grid>
    );
};
