import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { GroupAddIcon } from "../icons";
// import { EditableTextField } from "../ui";
import { useStyles } from "./styles";
import { post } from "../network";
import { useTeam } from "../teams";
import {
   Box,
   Button,
   // Button,
   Card,
   Divider,
   // IconButton,
   // TextField,
   Typography,
} from "../ui";
import { AddRosterDialog } from "./AddRosterDialog";
import { useCurrentUserInfo } from "../users";
import { DisplayRosterItem } from "./DisplayRosterItem";
// import { isEmail } from "../util";

export const RostersPage = () => {
   // const classes = useStyles();
   const { teamId } = useParams();
   const { isLoading: isLoadingTeam, team } = useTeam(teamId);
   const { userInfo } = useCurrentUserInfo();
   const { id: currentUserId, membershipTypeId = "" } = userInfo || {};
   const isCoach = membershipTypeId === "coach";
   const {
      name: teamName = "",
      coaches = [],
      rosters: initialRosters = [],
   } = team;
   const [rosters, setRosters] = useState(initialRosters);
   // const [newPlayerEmail, setNewPlayerEmail] = useState("");
   // const [addingPlayerToIndex, setAddingPlayerToIndex] = useState(-1);
   // const [newPlayerEmailError, setNewPlayerEmailError] = useState("");
   const [newPlayerEmails, setNewPlayerEmails] = useState({});
   const [showAddRosterDialog, setShowAddRosterDialog] = useState(false);
   const [progress, setProgress] = useState(false);

   useEffect(() => {
      setRosters(team.rosters);
      console.log(team.rosters);
   }, [team.rosters]);

   const onAddPlayer = async (rosterId, email, _callback) => {
      // if (!isEmail(newPlayerEmail))
      // if (!isEmail(email)) return setNewPlayerEmailError("Not a valid email");

      try {
         await post(`/api/rosters/${rosterId}/players`, {
            email: email,
            // email: newPlayerEmail,
         });
         setNewPlayerEmails({
            ...newPlayerEmails,
            // [rosterId]: [...(newPlayerEmails[rosterId] || []), newPlayerEmail],
            [rosterId]: [...(newPlayerEmails[rosterId] || []), email],
         });
         _callback("");
         // setNewPlayerEmail("");
         // setAddingPlayerToIndex(-1);
         // setNewPlayerEmailError("");
      } catch (e) {
         console.log(e);
         // setNewPlayerEmailError("Something went wrong with the server...");
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
            await axios.delete(`/api/rosters/${rosterId}`);
            setRosters(rosters.filter((roster) => roster.id !== rosterId));
         } catch (e) {
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
         console.log(result.data);
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
   console.log(rosters);
   // const onCancelAddingPlayer = () => setAddingPlayerToIndex(-1);

   return isLoadingTeam ? (
      <p>Loading...</p>
   ) : (
      <Box>
         <Typography variant="h2">{teamName}</Typography>
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
                  color="primary"
                  onClick={() => {
                     setShowAddRosterDialog(true);
                  }}
                  variant="contained"
               >
                  Add Roster
               </Button>
               <AddRosterDialog
                  open={showAddRosterDialog}
                  setOpen={setShowAddRosterDialog}
                  createRoster={createRoster}
                  progress={progress}
               />
            </>
         )}
         {rosters.map(
            (
               { id: rosterId, name: rosterName, players, invitations },
               rosterIndex
            ) => {
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
                     {/* <Box py={2} className={classes.rosterName}>
                        <h3 className={classes.rosterNameItems}>
                           {rosterName}
                        </h3> */}
                     {/* <EditableTextField value={name} setValue={setName} editable={edit} */}
                     {/* {rosterName && (
                           <>
                              <IconButton
                                 // onClick={() => onDeleteRoster(rosterId)}
                                 className={classes.rosterNameItems}
                              >
                                 <EditIcon size="small" />
                              </IconButton>
                              <IconButton
                                 onClick={() => onDeleteRoster(rosterId)}
                                 className={classes.rosterNameItems}
                              >
                                 <ClearIcon size="small" />
                              </IconButton>
                           </>
                        )} */}
                     {/* </Box>
                     {players.map(
                        ({ id: playerId, fullName: playerName, gamerName }) => (
                           <Box mb={2}>
                              <Link
                                 to={`/teams/${teamId}/rosters/${rosterId}/members/${playerId}`}
                                 onClick={
                                    isCoach || playerId === currentUserId
                                       ? () => {}
                                       : (e) => {
                                            e.preventDefault();
                                         }
                                 }
                                 style={
                                    isCoach || playerId === currentUserId
                                       ? { cursor: "pointer" }
                                       : { cursor: "default" }
                                 }
                              >
                                 <Card
                                    style={
                                       playerId === currentUserId
                                          ? { border: "4px solid #7289da" }
                                          : {}
                                    }
                                 >
                                    <Box p={2}>
                                       <p>
                                          {playerName} - {gamerName}
                                       </p>
                                    </Box>
                                 </Card>
                              </Link>
                           </Box>
                        )
                     )}
                     {invitations.map(({ email }) => (
                        <Box mb={2}>
                           <Card>
                              <Box p={2}>
                                 <p>{email} - Invitation Pending</p>
                              </Box>
                           </Card>
                        </Box>
                     ))}
                     {newPlayerEmailsForRoster.map((email) => (
                        <Box mb={2}>
                           <Card>
                              <Box p={2}>
                                 <p>{email} - Invitation Pending</p>
                              </Box>
                           </Card>
                        </Box>
                     ))}
                     {isCoach && (
                        <form
                           onSubmit={(e) => {
                              onAddPlayer(rosterId);
                              e.preventDefault();
                           }}
                        >
                           <Box mb={2} style={{ display: "flex" }}>
                              {addingPlayerToIndex === rosterIndex ? (
                                 <>
                                    <TextField
                                       error={!!newPlayerEmailError}
                                       helperText={newPlayerEmailError}
                                       value={newPlayerEmail}
                                       onChange={(e) =>
                                          setNewPlayerEmail(e.target.value)
                                       }
                                       style={{ flex: 8, marginRight: 8 }}
                                       label="Email Address"
                                       fullWidth
                                       inputRef={(input) =>
                                          input && input.focus()
                                       }
                                       variant="outlined"
                                    />
                                    <Button
                                       onClick={onCancelAddingPlayer}
                                       style={{ flex: 1, marginRight: 8 }}
                                       color="primary"
                                       variant="contained"
                                    >
                                       Cancel
                                    </Button>
                                    <Button
                                       style={{ flex: 1 }}
                                       color="primary"
                                       variant="contained"
                                       type="submit"
                                    >
                                       Add
                                    </Button>
                                 </>
                              ) : (
                                 <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() =>
                                       setAddingPlayerToIndex(rosterIndex)
                                    }
                                 >
                                    + Add Member
                                 </Button>
                              )}
                           </Box>
                        </form>
                     )}
                     <Divider /> */}
                  </>
               );
            }
         )}
      </Box>
   );
};
