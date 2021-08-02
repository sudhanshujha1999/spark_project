import {
    Box,
    TextField,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
} from "../ui";
import { useStyles } from "./styles";
import { useState } from "react";
import { isEmail } from "../util";
import axios from "axios";

export const HeadingForm = ({ nextStep }) => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [organisation, setOrganisation] = useState("");
    const [refer, setRefer] = useState("");
    const [userType, setUserType] = useState("");
    const [userLevel, setUserLevel] = useState("");
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);

    const handleSubmit = async () => {
        setError("");
        if (!email || !organisation || !userType || !userLevel) {
            setError("Please fill all the fields!");
            return;
        }
        if (!isEmail(email)) {
            setError("Incorrect Email!");
            return;
        }
        setSending(true);
        const sendObject = {
            email,
            organisation,
            refer,
            type: userType,
            level: userLevel,
        };
        try {
            await axios.post("/api/request-invite", sendObject);
            console.log("Request Sent");
        } catch (error) {
            console.log(error);
        }
        setSending(false);
        nextStep();
    };

    return (
        <Box
            className={classes.headingContainer}
            style={{
                paddingTop: "20px",
            }}>
            <Typography className={classes.bannerHeading}>We are in closed beta!</Typography>
            <Typography className={classes.body}>
                Please submit your email and tell us a little bit about your team if you haven't
                spoke with us already!
            </Typography>
            <TextField
                variant='filled'
                label='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={classes.textfield}
                InputLabelProps={{
                    className: classes.label,
                }}
                InputProps={{ disableUnderline: true }}
            />
            <Box className={classes.selectContainer}>
                <FormControl variant='filled' className={`${classes.textfield} ${classes.select}`}>
                    <InputLabel id='-select-filled-label' className={classes.label}>
                        Who are you
                    </InputLabel>
                    <Select
                        disableUnderline
                        MenuProps={{ disableScrollLock: true }}
                        labelId='select-filled-label'
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}>
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Coach"}>Coach</MenuItem>
                        <MenuItem value={"Player"}>Player</MenuItem>
                        <MenuItem value={"Captain"}>Captain</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant='filled' className={`${classes.textfield} ${classes.select}`}>
                    <InputLabel id='-select-filled-label' className={classes.label}>
                        Organization Level
                    </InputLabel>
                    <Select
                        disableUnderline
                        MenuProps={{ disableScrollLock: true }}
                        labelId='select-filled-label'
                        value={userLevel}
                        onChange={(e) => setUserLevel(e.target.value)}>
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Pro"}>Pro</MenuItem>
                        <MenuItem value={"Amateur/Semi-Pro"}>Amateur/Semi-Pro</MenuItem>
                        <MenuItem value={"School"}>School</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <TextField
                variant='filled'
                label='Organization Name'
                value={organisation}
                onChange={(e) => setOrganisation(e.target.value)}
                className={classes.textfield}
                InputLabelProps={{
                    className: classes.label,
                }}
                InputProps={{ disableUnderline: true }}
            />
            <TextField
                variant='filled'
                label='Did someone refer you? If so who?'
                value={refer}
                onChange={(e) => setRefer(e.target.value)}
                className={classes.textfield}
                InputLabelProps={{
                    className: classes.label,
                }}
                InputProps={{ disableUnderline: true }}
            />
            <Button
                color='secondary'
                className={classes.btn}
                variant='contained'
                disabled={sending}
                onClick={handleSubmit}>
                {sending ? <CircularProgress size='2em' /> : "Submit"}
            </Button>
            {error && <Box className={classes.error}>{error}</Box>}
        </Box>
    );
};
