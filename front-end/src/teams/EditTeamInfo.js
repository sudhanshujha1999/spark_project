import { useParams } from "react-router-dom";
import { useGetOneTeam } from "./useGetOneTeam";
import { useState, useEffect } from "react";
import { put } from "../network";
import firebase from "firebase";
import "firebase/storage";
import {
    CircularProgress,
    Box,
    Container,
    CustomSnackbar,
    Grid,
    Button,
    IconButton,
    TextField,
    Typography,
} from "../ui";
import { useStyles } from "./styles";
import { EditIcon } from "../icons";

const TYPES = ["image/jgp", "image/jpeg", "image/png"];

export const EditTeamInfo = () => {
    const classes = useStyles();
    const { teamId } = useParams();
    const team = useGetOneTeam(teamId);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [name, setName] = useState("");
    const [game, setGame] = useState("");
    const [img, setImg] = useState(null);
    const [newImg, setNewImg] = useState(null);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("success");

    useEffect(() => {
        if (team) {
            console.log(team);
            setName(team.name);
            setGame(team.game);
            setImg(team.url);
            setLoading(false);
        }
    }, [team]);

    const imgfunction = async (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && TYPES.includes(selectedFile.type)) {
            setImg(URL.createObjectURL(selectedFile));
            setNewImg(selectedFile);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        if (name === "" || game === "") {
            setMessage("Please fill all value");
            setType("error");
            return;
        }
        // IF THERE IS A NEW IMAGE THEN DO THIS
        if (newImg) {
            // IF URL EXIST THEN DELETE THE OLD IMAGE IF NOT IN THE DEFAULT ONE
            if (team.url) {
                const path = firebase.storage().refFromURL(team.url).fullPath;
                const storageFolder = path.substr(0, path.indexOf("/"));
                if (storageFolder !== "default") {
                    // DELETE IMAGE
                    const imageRef = firebase.storage().ref(path);
                    imageRef
                        .delete()
                        .then(() => console.log("IMAGE DELETED"))
                        .catch((err) => {
                            setMessage("Please try later!");
                            setType("error");
                            console.log(err, "Failed");
                        });
                }
            }

            // UPLOAD THE NEW IMAGE
            const storageRef = firebase
                .storage()
                .ref(`/teamImage/${teamId}+${name}+${newImg.name}`);
            storageRef.put(newImg).on(
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
                        .then(async (url) => {
                            const newTeamInfo = {
                                name,
                                game,
                                url,
                            };
                            try {
                                await put(`/api/team/${teamId}/update`, newTeamInfo);
                                console.log("updated");
                                setSaving(false);
                                setImg(url);
                                setMessage("Team Updated!");
                                setType("success");
                            } catch (error) {
                                setMessage("Please try later!");
                                setType("error");
                                console.log(error);
                            }
                        })
                        .catch((error) => {
                            setMessage("Please try later!");
                            setType("error");
                            console.log(error);
                        })
            );
        } else {
            if (name !== team.name || game !== team.game) {
                const newTeamInfo = {
                    name,
                    game,
                    url: img,
                };
                try {
                    await put(`/api/team/${teamId}/update`, newTeamInfo);
                    console.log("updated");
                    setSaving(false);
                    setMessage("Team Updated!");
                    setType("success");
                } catch (error) {
                    console.log(error);
                    setMessage("Please try later!");
                    setType("error");
                }
            } else {
                console.log("No Change");
                setSaving(false);
            }
        }
    };

    return (
        <div>
            {loading ? (
                <Box className={classes.load}>
                    <CircularProgress color="secondary" />
                </Box>
            ) : (
                <Container maxWidth="lg">
                    <Grid
                        container
                        style={{
                            marginTop: "-20px",
                            minHeight: "80vh",
                        }}>
                        <Grid item xs={12} sm={6}>
                            <Box className={classes.contentContainer}>
                                <Typography className={classes.teamName}>
                                    {name ? name : "Enter a team name"}
                                </Typography>
                                <Box className={classes.imageContainer}>
                                    <IconButton
                                        component="label"
                                        className={classes.imgChangeButton}>
                                        <EditIcon />
                                        <input type="file" hidden onChange={imgfunction} />
                                    </IconButton>
                                    <Box
                                        style={{
                                            backgroundImage: `url(${img})`,
                                        }}
                                        className={classes.img}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <h1>Team Info</h1>
                            <Box mb={2}>
                                <TextField
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    fullWidth
                                    label="Team Name"
                                    variant="outlined"
                                />
                            </Box>
                            <Box mb={2}>
                                <TextField
                                    value={game}
                                    onChange={(e) => {
                                        setGame(e.target.value);
                                    }}
                                    fullWidth
                                    label="Game"
                                    variant="outlined"
                                />
                            </Box>
                            <Box my={3} />
                            <Box py={2}>
                                <Grid container justify="space-between">
                                    <Grid item xs={12}>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            disabled={saving}
                                            fullWidth
                                            onClick={handleSave}>
                                            {saving ? (
                                                <CircularProgress size="2em" color="primary" />
                                            ) : (
                                                "Save"
                                            )}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    <CustomSnackbar message={message} setMessage={setMessage} type={type} />
                </Container>
            )}
        </div>
    );
};