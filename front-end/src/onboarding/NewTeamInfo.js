import { useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { useHistory, useParams } from "react-router-dom";
import firebase from "firebase";
import "firebase/storage";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    DeletableListItem,
    Divider,
    Grid,
    Slide,
    TextField,
    Typography,
} from "../ui";
import { onboardingState } from "./onboardingState";
import { useStyles } from "./styles";
import { defaultImage } from "../teams/defaultGames";
import { GAMES as games } from "../teams/defaultGames";
import controller from "../img/controller.png";

const validations = [
    {
        test: ({ name }) => name.length > 1,
        errorMessage: "Team name must be 2 characters or longer",
    },
    {
        test: ({ game }) => game.length > 1,
        errorMessage: "Please specify what game your team will be playing",
    },
    {
        test: ({ rosters }) => rosters.length > 0,
        errorMessage: "You must add at least one roster",
    },
];
const TYPES = ["image/jgp", "image/jpeg", "image/png"];

export const NewTeamInfo = () => {
    const [isAddingRoster, setIsAddingRoster] = useState(false);
    const [newRosterName, setNewRosterName] = useState("");
    const [onboardingInfo, setOnboardingInfo] = useRecoilState(onboardingState);
    const {
        name: initialName = "",
        game: initialGame = "",
        rosters: initialRosters = [],
        url: initialUrl = null,
    } = onboardingInfo.newTeamInfo || {};
    const [name, setName] = useState(initialName);
    const [game, setGame] = useState(initialGame);
    const [img, setImg] = useState(initialUrl);
    const [rosters, setRosters] = useState(initialRosters);
    const [validationErrors, setValidationErrors] = useState([]);
    const [uploading, setUploading] = useState(false);

    // FOR DISPLAY PURPOSE
    const [active, setActive] = useState({});
    const [show, setShow] = useState(true);
    const previewRef = useRef(null);

    const history = useHistory();
    const { schoolId } = useParams();
    const classes = useStyles();

    const getValidationErrors = () => {
        const fields = { name, game, rosters };
        const errors = validations
            .filter((validation) => !validation.test(fields))
            .map((validation) => validation.errorMessage);
        return errors;
    };

    const onNext = async () => {
        const validationErrors = getValidationErrors();
        setValidationErrors(validationErrors);
        if (validationErrors.length > 0) return;

        let newTeamInfo = {};
        if (img && previewRef.current) {
            setUploading(true);
            if (initialUrl) {
                await deleteImage(initialUrl);
            }
            const storageRef = firebase.storage().ref(`/teamImage/${schoolId}+${name}+${img.name}`);
            storageRef.put(img).on(
                "state_changed",
                (snapshot) => {
                    console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                },
                (err) => {
                    console.log(err);
                },
                () =>
                    storageRef
                        .getDownloadURL()
                        .then((url) => {
                            newTeamInfo = {
                                name,
                                game,
                                schoolId,
                                rosters,
                                url,
                            };
                            setOnboardingInfo({
                                ...onboardingInfo,
                                newTeamInfo,
                            });
                            history.push(`/onboarding/schools/123/teams/234/players`);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
            );
            setUploading(false);
        } else {
            newTeamInfo = {
                name,
                game,
                schoolId,
                rosters,
                url: img ? img : Object.keys(active).length !== 0 ? active.img : defaultImage,
            };
            setOnboardingInfo({
                ...onboardingInfo,
                newTeamInfo,
            });
            history.push(`/onboarding/schools/123/teams/234/players`);
        }
    };

    const onDeleteRoster = (index) => {
        setRosters([...rosters.slice(0, index), ...rosters.slice(index + 1)]);
    };

    const onPrevious = () => {
        history.push("/onboarding/schools/123/teams");
    };

    const imgfunction = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && TYPES.includes(selectedFile.type)) {
            setShow(false);

            setTimeout(() => {
                setImg(selectedFile);
                previewRef.current = URL.createObjectURL(selectedFile);
                setShow(true);
            }, 500);
        }
    };

    const onSelectGame = async (game) => {
        // reset();
        setShow(false);
        setImg(null);
        setGame(game.name);
        setTimeout(() => {
            setActive(game);
            setShow(true);
        }, 500);
    };

    const deleteImage = async (url) => {
        const path = firebase.storage().refFromURL(url).fullPath;
        const storageFolder = path.substr(0, path.indexOf("/"));
        if (storageFolder !== "default") {
            // DELETE IMAGE
            const imageRef = firebase.storage().ref(path);

            try {
                await imageRef.delete();
                console.log("IMAGE DELETED");
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Container maxWidth='lg'>
            <Grid
                container
                style={{
                    minHeight: "80vh",
                    marginTop: "100px",
                }}>
                <Grid item xs={12} sm={6}>
                    <Box className={classes.contentContainer}>
                        <Typography className={classes.teamName}>
                            {name ? name : "Enter a team name"}
                        </Typography>
                        <Box className={classes.imageContainer}>
                            <Slide in={show} direction='right'>
                                <Box
                                    style={{
                                        backgroundImage: img
                                            ? previewRef.current
                                                ? `url(${previewRef.current})`
                                                : `url(${img})`
                                            : Object.keys(active).length !== 0
                                            ? `url(${active.img})`
                                            : `url(${defaultImage})`,
                                    }}
                                    className={classes.img}
                                />
                            </Slide>
                        </Box>
                        <img className={classes.controller} src={controller} alt='Controller-ps5' />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <h1>New Team Info</h1>
                    {validationErrors.map((error) => (
                        <Box mb={2}>
                            <Alert severity='error'>{error}</Alert>
                        </Box>
                    ))}
                    <Box mb={2}>
                        <TextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            label='Team Name'
                            variant='outlined'
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            value={game}
                            onChange={(e) => {
                                if (Object.keys(active).length !== 0) {
                                    setActive({});
                                }
                                setGame(e.target.value);
                            }}
                            fullWidth
                            label='Game'
                            variant='outlined'
                        />
                    </Box>
                    <Box mb={2} className={classes.gamesContainer}>
                        {games.map((eachGame) => (
                            <Box
                                key={eachGame.name}
                                className={
                                    game === eachGame.name
                                        ? `${classes.game} ${classes.active}`
                                        : `${classes.game}`
                                }
                                onClick={() => {
                                    onSelectGame(eachGame);
                                }}>
                                {eachGame.name}
                            </Box>
                        ))}
                    </Box>
                    <Box my={2}>
                        <Typography variant='h6' gutterBottom>
                            Upload your game picture
                        </Typography>
                        <Button variant='contained' color='primary' component='label'>
                            {img ? "Change" : "Upload"}
                            <input type='file' hidden onChange={imgfunction} />
                        </Button>
                    </Box>
                    <Divider />
                    <Box mb={2}>
                        <h3>Team Rosters:</h3>
                    </Box>
                    <Box mb={2}>
                        {rosters.map((roster, i) => (
                            <>
                                <DeletableListItem onRequestDelete={onDeleteRoster} index={i}>
                                    <p key={roster.name}>{roster.name}</p>
                                </DeletableListItem>
                                <Divider />
                            </>
                        ))}
                    </Box>
                    <Box mb={2} style={{ display: "flex " }}>
                        {isAddingRoster ? (
                            <>
                                <TextField
                                    value={newRosterName}
                                    onChange={(e) => setNewRosterName(e.target.value)}
                                    style={{ flex: 8, marginRight: 8 }}
                                    label='Roster Name'
                                    variant='outlined'
                                />
                                <Button
                                    style={{ flex: 1, marginRight: 8 }}
                                    onClick={() => setIsAddingRoster(false)}
                                    color='primary'
                                    variant='contained'>
                                    Cancel
                                </Button>
                                <Button
                                    color='primary'
                                    style={{ flex: 1 }}
                                    onClick={() => {
                                        setRosters([...rosters, { name: newRosterName }]);
                                        setIsAddingRoster(true);
                                        setNewRosterName("");
                                    }}
                                    variant='contained'>
                                    Add
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={() => setIsAddingRoster(true)}
                                color='primary'
                                variant='contained'>
                                + Add Roster
                            </Button>
                        )}
                    </Box>
                    <Divider />
                    <Box py={2}>
                        <Grid container justify='space-between'>
                            <Grid item>
                                <Button variant='contained' onClick={onPrevious}>
                                    Back
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    disabled={uploading}
                                    onClick={onNext}>
                                    {uploading ? (
                                        <CircularProgress size='2em' color='secondary' />
                                    ) : (
                                        "Next"
                                    )}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};
