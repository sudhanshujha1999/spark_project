import { useState, useEffect, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { GroupAddIcon, ClearIcon } from "../icons";
import { useStyles } from "./styles";
import { post, del } from "../network";
import { useTeam, useOrganizations } from "../teams";
import {
    Avatar,
    Box,
    Button,
    Container,
    Card,
    Chip,
    CircularProgress,
    CustomSnackbar,
    Divider,
    Fab,
    Typography,
} from "../ui";
import { AddRosterDialog } from "./AddRosterDialog";
import { useCurrentUserInfo } from "../users";
import { useIsCoach } from "../users/useIsCoach";
import { DisplayRosterItem } from "./DisplayRosterItem";

export const RostersPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const { teamId } = useParams();
    const { organizations, updateOrganizations } = useOrganizations();
    const { isLoading: isLoadingTeam, team } = useTeam(teamId);
    const { userInfo } = useCurrentUserInfo();
    const { isCoach } = useIsCoach(teamId);
    const { _id: currentUserId } = userInfo || {};
    const { name: teamName = "", admins = [] } = team;
    const [rosters, setRosters] = useState([]);
    const [invitations, setInvitations] = useState([]);
    const [newPlayerEmails, setNewPlayerEmails] = useState({});
    const [showAddRosterDialog, setShowAddRosterDialog] = useState(false);
    const [progress, setProgress] = useState(false);
    const [deleteProgress, setDeleteProgress] = useState(false);
    const [message, setMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState("error");

    const hasCaptian = useMemo(() => {
        if (team.admins) {
            if (team.admins.filter((admin) => admin.admin_type === "CAPTIAN").length) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }, [team]);

    useEffect(() => {
        if (team.rosters) {
            setRosters(team.rosters);
        }
    }, [team.rosters]);

    useEffect(() => {
        if (team.invitations) {
            setInvitations(team.invitations);
        }
    }, [team.invitations]);

    const onAddPlayer = async (rosterId, email, _callback) => {
        try {
            await post(`/api/rosters/${rosterId}/players`, {
                email: email,
            });
            setInvitations([...invitations, { email }]);
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
            setDeleteProgress(true);
            try {
                await del(`/api/rosters/${rosterId}`);
                setRosters(rosters.filter((roster) => roster._id !== rosterId));
            } catch (e) {
                console.log(e);
            }
            setDeleteProgress(false);
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
            const {
                data: { roster },
            } = await post("/api/rosters/add", newRosterObject);
            // --------------------
            console.log(roster);
            setRosters([...rosters, roster]);
        } catch (error) {
            console.log(error);
            setProgress(false);
        }
        setProgress(false);
        setShowAddRosterDialog(false);
    };

    const handleDeleteTeam = async () => {
        // eslint-disable-next-line no-restricted-globals
        const userReallyWantsToDelete = confirm(
            "Are you sure you want to delete this team and all its corresponding data? (You cannot undo this)"
        );
        if (organizations.teams.length <= 1) {
            setSnackbarType("error");
            setMessage(
                "That's your last team! You must have at least one team. Please create another before deleting this one"
            );
            return;
        }
        if (userReallyWantsToDelete) {
            try {
                console.log(teamId);
                const { data } = await del(`/api/teams/${teamId}`);
                updateOrganizations();
                console.log({ data });
                history.push("/dashboard");
            } catch (e) {
                console.log(e);
            }
        }
    };

    console.log(invitations);

    return isLoadingTeam ? (
        <Box className={classes.load}>
            <CircularProgress color='secondary' />
        </Box>
    ) : (
        <>
            {/* Might have some elements in this component */}
            <Container maxWidth='lg'>
                <Box
                    style={{
                        position: "relative",
                        minHeight: "83vh",
                        paddingBottom: "50px",
                        marginTop: "150px",
                    }}>
                    <Box
                        style={{
                            position: "relative",
                        }}>
                        <Box
                            style={{
                                backgroundImage: `url(${team.image_url})`,
                            }}
                            className={classes.teamBanner}
                        />
                        <Box>
                            <Typography variant='h2'>{teamName}</Typography>
                            <h1>Coaches</h1>
                            <Box mb={2}>
                                <Card className={classes.adminInfoContainer}>
                                    {admins.map(({ name: coachName, profile_img }) => (
                                        <Box width='fit-content' m={2}>
                                            <Chip
                                                avatar={
                                                    profile_img ? (
                                                        <Avatar alt={coachName} src={profile_img} />
                                                    ) : (
                                                        <Avatar>{coachName?.charAt(0)}</Avatar>
                                                    )
                                                }
                                                label={coachName}
                                                // onClick={handleClick}
                                                variant='outlined'
                                                color='secondary'
                                            />
                                        </Box>
                                    ))}
                                </Card>
                            </Box>
                        </Box>
                    </Box>
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
                    {/* {false && */}
                    {rosters &&
                        rosters.map(
                            (
                                { _id: rosterId, name: rosterName, players, invitations = [] },
                                rosterIndex
                            ) => {
                                const newPlayerEmailsForRoster = newPlayerEmails[rosterId] || [];
                                return (
                                    <>
                                        {rosterName && (
                                            <DisplayRosterItem
                                                rosterId={rosterId}
                                                isDefaultRoster={rosterName === "DEFAULT_ROSTER"}
                                                rosterName={rosterName}
                                                players={players}
                                                isCoach={isCoach}
                                                hasCaptian={hasCaptian}
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

                    {invitations.map(({ email }) => (
                        <Box mt={3} mb={2}>
                            <Card>
                                <Box p={2}>
                                    <p>{email} - Invitation Pending</p>
                                </Box>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Container>
            <CustomSnackbar message={message} setMessage={setMessage} type={snackbarType} />
        </>
    );
};
