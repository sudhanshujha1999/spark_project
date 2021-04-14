import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { GroupAddIcon, ClearIcon } from "../icons";
// import { EditableTextField } from "../ui";
import { useStyles } from "./styles";
import { post } from "../network";
import { useTeam, useTeams } from "../teams";
import { Box, Button, Card, CircularProgress, Divider, Fab, Typography } from "../ui";
import { AddRosterDialog } from "./AddRosterDialog";
import { useCurrentUserInfo } from "../users";
import { DisplayRosterItem } from "./DisplayRosterItem";

export const RostersPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const { teamId } = useParams();
    const [teams] = useTeams();
    const { isLoading: isLoadingTeam, team } = useTeam(teamId);
    // console.log(team);
    const { userInfo } = useCurrentUserInfo();
    const { id: currentUserId, membershipTypeId = "" } = userInfo || {};
    const isCoach = membershipTypeId === "coach";
    const { name: teamName = "", coaches = [], rosters: initialRosters = [] } = team;
    const [rosters, setRosters] = useState(initialRosters);
    const [newPlayerEmails, setNewPlayerEmails] = useState({});
    const [showAddRosterDialog, setShowAddRosterDialog] = useState(false);
    const [progress, setProgress] = useState(false);
    const [deleteProgress, setDeleteProgress] = useState(false);

    useEffect(() => {
        setRosters(team.rosters);
    }, [team.rosters]);

    const onAddPlayer = async (rosterId, email, _callback) => {
        try {
            await post(`/api/rosters/${rosterId}/players`, {
                email: email,
            });
            setNewPlayerEmails({
                ...newPlayerEmails,
                [rosterId]: [...(newPlayerEmails[rosterId] || []), email],
            });
            _callback("");
        } catch (e) {
            console.log(e);
            _callback("Something went wrong with the server...");
        }
    };

    const onDeleteRoster = async (rosterId) => {
        // eslint-disable-next-line no-restricted-globals
        const userReallyWantsToDeleteRoster = confirm(
            "Are you sure you want to delete this roster and all its corresponding info? (You cannot undo this)"
        );
        if (userReallyWantsToDeleteRoster) {
            try {
                setDeleteProgress(true);
                await axios.delete(`/api/rosters/${rosterId}`);
                setRosters(rosters.filter((roster) => roster.id !== rosterId));
                history.push("/");
            } catch (e) {
                setDeleteProgress(false);
                console.log(e);
            }
        }
    };

    const createRoster = async (name) => {
        setProgress(true);
        const newRosterObject = {
            name,
            teamId: teamId,
            coachId: currentUserId,
        };
        // SEND THIS OBJECT AND CREATE A NEW OBJECT
        try {
            const result = await axios.post("/api/rosters/add", newRosterObject);
            // --------------------
            // console.log(rosters);
            const addedRoster = {
                groupType: "roster",
                id: result.data.id,
                name,
                players: [],
                invitations: [],
            };
            setRosters([...rosters, addedRoster]);
            setProgress(false);
            setShowAddRosterDialog(false);
        } catch (error) {
            console.log(error);
            setProgress(false);
        }
    };

    const handleDeleteTeam = async () => {
        // eslint-disable-next-line no-restricted-globals
        const userReallyWantsToDelete = confirm(
            "Are you sure you want to delete this team and all its corresponding data? (You cannot undo this)"
        );
        if (teams.length <= 1) {
            alert(
                "That's your last team! You must have at least one team. Please create another before deleting this one"
            );
            return;
        }
        if (userReallyWantsToDelete) {
            try {
                await axios.delete(`/api/teams/${teamId}`);
                history.push("/");
            } catch (e) {
                console.log(e);
            }
        }
    };

    return isLoadingTeam ? (
        <Box className={classes.load}>
            <CircularProgress color='secondary' />
        </Box>
    ) : (
        <>
            {/* Might have some elements in this component */}
            <Box
                style={{
                    backgroundImage: `url(${team.url})`,
                }}
                className={classes.teamBanner}
            />
            <Box
                style={{
                    position: "relative",
                    minHeight: "83vh",
                    paddingBottom: "50px",
                }}>
                <Typography variant='h2'>{teamName}</Typography>
                <h1>Coaches</h1>
                {coaches.map(({ fullName: coachName }) => (
                    <Box mb={2}>
                        <Card>
                            <Box p={2}>
                                <p>{coachName}</p>
                            </Box>
                        </Card>
                    </Box>
                ))}
                <Divider />
                <h1>Rosters</h1>
                {isCoach && (
                    <>
                        <Button
                            startIcon={<GroupAddIcon />}
                            color='primary'
                            onClick={() => {
                                setShowAddRosterDialog(true);
                            }}
                            variant='contained'>
                            Add Roster
                        </Button>
                        <AddRosterDialog
                            open={showAddRosterDialog}
                            setOpen={setShowAddRosterDialog}
                            createRoster={createRoster}
                            progress={progress}
                        />
                        {/* DELETE FUNCTIONALITY TO BE DISSCUSSED */}
                        <Fab
                            variant='extended'
                            size='small'
                            aria-label='add'
                            className={classes.fabDelete}
                            onClick={handleDeleteTeam}>
                            {deleteProgress ? (
                                <CircularProgress color='primary' size='1.8em' />
                            ) : (
                                <>
                                    <ClearIcon />
                                    Delete Team
                                </>
                            )}
                        </Fab>
                    </>
                )}
                {rosters.map(
                    ({ id: rosterId, name: rosterName, players, invitations }, rosterIndex) => {
                        const newPlayerEmailsForRoster = newPlayerEmails[rosterId] || [];
                        return (
                            <>
                                {rosterName && (
                                    <DisplayRosterItem
                                        rosterId={rosterId}
                                        rosterName={rosterName}
                                        players={players}
                                        isCoach={isCoach}
                                        newPlayerEmailsForRoster={newPlayerEmailsForRoster}
                                        onAddPlayer={onAddPlayer}
                                        currentUserId={currentUserId}
                                        invitations={invitations}
                                        onDeleteRoster={onDeleteRoster}
                                        teamId={teamId}
                                    />
                                )}
                            </>
                        );
                    }
                )}
            </Box>
        </>
    );
};
