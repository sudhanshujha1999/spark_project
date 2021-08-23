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
import { Box, Button, CircularProgress, Divider, Grid, Tabs, Tab, Typography } from "../ui";
import { useStyles } from "./styles";
import { DiscordSvgIcon } from "../img/DiscordSvgIcon";

export const MemberDetailPage = ({ currentUserId }) => {
    const { memberId: memberIdFromParams, teamId } = useParams();
    const memberId = memberIdFromParams ? memberIdFromParams : currentUserId ? currentUserId : null;
    const { isLoading, user } = useUser(memberId);
    const { userInfo: currentUser } = useCurrentUserInfo();
    const { notes, setNotes } = useNotes(memberId, teamId);
    const teams = useGetTeamsForUser(user);
    const [value, setValue] = useState(0);
    const tabLabel = ["Overview", "Notes"];
    const baseURL = process.env.IS_PRODUCTION
        ? `https://sparkesports.gg/api`
        : process.env.IS_QA
        ? `https://dev.sparkesports.gg/api`
        : `http://localhost:8080/api`;
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // NEED TO REMOVE AFTER EVERTINH IS DONE
    const addNote = async (text) => {
        try {
            const response = await post(`/api/players/${memberId}/notes`, {
                text: text,
                groupId: teamId,
            });
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
                <CircularProgress color='secondary' />
            </Box>
        ),
        <Notes
            notes={notes}
            addNote={addNote}
            deleteNote={deleteNote}
            viewingOwnProfile={currentUserId === memberId}
        />,
    ];
    return isLoading ? (
        <p>Loading...</p>
    ) : (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box className={classes.profileDetails}>
                        {user && currentUser && (
                            <ProfilePic isCuurentUser={user._id === currentUser._id} user={user} />
                        )}
                        <Box className={classes.detailsContent}>
                            <Typography className={classes.name} gutterBottom variant='h2'>
                                {user.full_name}
                            </Typography>
                            <Box display='flex' alignItems='center' justifyContent='center'>
                                <Box className={classes.gamerName}>
                                    <img style={{ width: 20 }} src={gamerIcon} alt={gamerIcon} />
                                    <Typography variant='h3'>{user.gamer_name}</Typography>
                                </Box>
                                <Box mr={1}>
                                    {user?.discord.linked ? (
                                        <Box className={classes.gamerName}>
                                            <DiscordSvgIcon />
                                            <Typography variant='h3'>
                                                {`${user.discord.username}`}
                                            </Typography>
                                        </Box>
                                    ) : user?._id === currentUser?._id ? (
                                        <Button
                                            href={`${baseURL}/discord/link/?dest=profile&email=${user.email}`}
                                            className={classes.discordBtn}
                                            startIcon={<DiscordSvgIcon />}>
                                            Link discord
                                        </Button>
                                    ) : (
                                        <Box className={classes.gamerName}>
                                            <DiscordSvgIcon />
                                            <Typography variant='h6'>Discord</Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Tabs
                        textColor='secondary'
                        indicatorColor='secondary'
                        value={value}
                        onChange={handleChange}>
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
        </>
    );
};
