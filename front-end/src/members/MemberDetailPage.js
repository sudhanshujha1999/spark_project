import { useState } from "react";
import { useParams } from "react-router-dom";
import { AccountCircleIcon, PhotoCameraIcon } from "../icons";
import gamerIcon from "../img/GamerIcon.svg";
import { post, del } from "../network";
import { useNotes } from "../notes";
import { useUser } from "../users";
import { useGetOneTeam } from "../teams";
import { Overview } from "./Overview";
import { Notes } from "./Notes";
import {
    Avatar,
    Badge,
    Box,
    Button,
    DeletableListItem,
    Divider,
    Grid,
    IconButton,
    TextField,
    Tabs,
    Tab,
    Typography,
    CircularProgress,
} from "../ui";
import { useStyles } from "./styles";

export const MemberDetailPage = () => {
    const [newNoteText, setNewNoteText] = useState("");
    const { memberId, teamId } = useParams();
    const teamInfo = useGetOneTeam(teamId);
    const { isLoading, user } = useUser(memberId);
    const { isLoading: isLoadingNotes, notes, setNotes } = useNotes(memberId);

    const [value, setValue] = useState(0);
    const tabLabel = ["Overview", "Notes"];
    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(teamInfo);
        console.log(user);
    };
    // NEED TO REMOVE AFTER EVERTINH IS DONE
    const addNote = async (text) => {
        try {
            const response = await post(`/api/players/${memberId}/notes`, { text: text });
            const newNote = response.data;
            setNotes([newNote, ...notes]);
            setNewNoteText("");
        } catch (e) {
            console.log(e);
        }
    };

    const deleteNote = async (noteId) => {
        try {
            await del(`/api/players/${memberId}/notes/${noteId}`);
            setNotes(notes.filter((note) => note.id !== noteId));
        } catch (e) {
            console.log(e);
        }
    };

    const classes = useStyles();

    const TABS = [
        teamInfo ? (
            <Overview user={user} teamInfo={teamInfo} />
        ) : (
            <Box classNAme={classes.load}>
                <CircularProgress color="secondary" />
            </Box>
        ),
        <Notes notes={notes} addNote={addNote} deleteNote={deleteNote} />,
    ];

    return isLoading ? (
        <p>Loading...</p>
    ) : (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box className={classes.profileDetails}>
                    <Badge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        badgeContent={
                            <IconButton className={classes.uploadBtn}>
                                <PhotoCameraIcon color="secondary" />
                            </IconButton>
                        }>
                        <Avatar className={classes.avatar}>
                            <AccountCircleIcon className={classes.icon} />
                        </Avatar>
                    </Badge>
                    <Box className={classes.detailsContent}>
                        <Typography className={classes.name} gutterBottom variant="h2">
                            {user.fullName}
                        </Typography>
                        <Box className={classes.gamerName}>
                            <img style={{ width: 20 }} src={gamerIcon} alt={gamerIcon} />
                            <Typography variant="h3">{user.gamerName}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Tabs value={value} onChange={handleChange}>
                    {tabLabel.map((item) => (
                        <Tab label={item} />
                    ))}
                </Tabs>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                {TABS[value]}
            </Grid>
            {/* <Grid item xs={12}> */}
            {/* OVERVIEW CONTAINER
                {teamInfo ? (
                    <Overview user={user} teamInfo={teamInfo} />
                ) : (
                    <Box classNAme={classes.load}>
                        <CircularProgress color="secondary" />
                    </Box>
                )} */}
            {/* </Grid> */}
        </Grid>
    );
};
