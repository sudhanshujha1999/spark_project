import { useState } from "react";
import { useParams } from "react-router-dom";
import gamerIcon from "../img/GamerIcon.svg";
import { ProfilePic } from "./ProfilePic";
import { post, del } from "../network";
import { useNotes } from "../notes";
import { useUser, useCurrentUserInfo } from "../users";
import { useGetTeamsForUser } from "../teams";
import { Overview } from "./Overview";
import { Notes } from "./Notes";
import { Box, CircularProgress, Divider, Grid, Tabs, Tab, Typography } from "../ui";
import { useStyles } from "./styles";

export const MemberDetailPage = ({ currentUserId }) => {
    const { memberId, teamId } = useParams();
    const { isLoading, user } = useUser(memberId ? memberId : currentUserId ? currentUserId : null);
    const { userInfo: currentUser, isLoading: loadingCurrentUser } = useCurrentUserInfo();
    const { isLoading: isLoadingNotes, notes, setNotes } = useNotes(memberId, teamId);
    const teams = useGetTeamsForUser(user);
    const [value, setValue] = useState(0);
    const tabLabel = ["Overview", "Notes"];

    const handleChange = (event, newValue) => {
        // console.log(teams);
        setValue(newValue);
        // console.log(currentUser);
        // console.log(user);
    };
    // NEED TO REMOVE AFTER EVERTINH IS DONE
    const addNote = async (text) => {
        try {
            const response = await post(`/api/players/${memberId}/notes`, { text: text, groupId: teamId });
            const newNote = response.data;
            setNotes([newNote, ...notes]);
        } catch (e) {
            console.log(e);
        }
    };

    const deleteNote = async (noteId) => {
        try {
            await del(`/api/players/${memberId}/notes/${noteId}`, { groupId: teamId });
            setNotes(notes.filter((note) => note.id !== noteId));
        } catch (e) {
            console.log(e);
        }
    };

    const classes = useStyles();

    const TABS = [
        teams ? (
            <Overview user={user} teams={teams} />
        ) : (
            <Box className={classes.load}>
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
                    {user && currentUser && (
                        <ProfilePic user={user.id === currentUser.id ? user : null} />
                    )}
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
        </Grid>
    );
};
