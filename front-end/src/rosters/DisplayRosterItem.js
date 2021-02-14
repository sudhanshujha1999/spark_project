import { useStyles } from "./styles";
import { useState } from "react";
import {
   Box,
   Button,
   Card,
   Divider,
   IconButton,
   TextField,
   EditableTextField,
} from "../ui";
import axios from "axios";
import { Link } from "react-router-dom";
import { ClearIcon, CheckIcon, EditIcon } from "../icons";
import { isEmail } from "../util";

export const DisplayRosterItem = ({
   rosterId,
   rosterName,
   players,
   isCoach,
   newPlayerEmailsForRoster,
   invitations,
   currentUserId,
   onDeleteRoster,
   teamId,
   onAddPlayer = () => {},
}) => {
   const [addPlayer, setAddPlayer] = useState(false);
   const [editable, setEditable] = useState(false);
   const [name, setName] = useState(rosterName);
   const [newPlayerEmail, setNewPlayerEmail] = useState("");
   const [newPlayerEmailError, setNewPlayerEmailError] = useState("");
   const classes = useStyles();
   const onClickAdd = async () => {
      if (!isEmail(newPlayerEmail))
         return setNewPlayerEmailError("Not a valid email");

      try {
         setNewPlayerEmailError("");
         console.log(rosterId, newPlayerEmail);
         onAddPlayer(rosterId, newPlayerEmail, (error) => {
            setNewPlayerEmailError(error);
            if (error === "") {
               setNewPlayerEmail("");
               setAddPlayer(false);
            }
         });
      } catch (e) {
         console.log(e);
         setNewPlayerEmailError("Something went wrong with the server...");
      }
   };

   const editRosterName = async () => {
      try {
         setEditable(false);
         await axios.put(`/api/roster/${rosterId}/update`, { name });
         console.log("saved");
      } catch (error) {
         setEditable(true);
         console.log(error);
      }
   };

   const handleClickEdit = () => {
      if (!editable) {
         setEditable(!editable);
         return;
      }
      // IF NAME IS EMPTY
      if (name === "") {
         console.log("Set name First");
         return;
      }
      // if the name is not changed return
      if (name === rosterName) {
         setEditable(!editable);
         return;
      }
      editRosterName();
   };

   return (
      <Box>
         <Box py={2} className={classes.rosterName}>
            {/* <h3 className={classes.rosterNameItems}>{rosterName}</h3> */}

            <EditableTextField
               value={name}
               setValue={setName}
               editable={editable}
               onPressEnter={editRosterName}
               align="left"
            />
            {rosterName && (
               <>
                  <IconButton
                     onClick={() => handleClickEdit()}
                     className={classes.rosterNameItems}
                  >
                     {editable ? (
                        <CheckIcon size="small" />
                     ) : (
                        <EditIcon size="small" />
                     )}
                  </IconButton>
                  <IconButton
                     onClick={() => onDeleteRoster(rosterId)}
                     className={classes.rosterNameItems}
                  >
                     <ClearIcon size="small" />
                  </IconButton>
               </>
            )}
         </Box>
         {players.map(({ id: playerId, fullName: playerName, gamerName }) => (
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
         ))}
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
                  onClickAdd();
                  e.preventDefault();
               }}
            >
               <Box mb={2} style={{ display: "flex" }}>
                  {addPlayer ? (
                     <>
                        <TextField
                           error={!!newPlayerEmailError}
                           helperText={newPlayerEmailError}
                           value={newPlayerEmail}
                           onChange={(e) => setNewPlayerEmail(e.target.value)}
                           style={{ flex: 8, marginRight: 8 }}
                           label="Email Address"
                           fullWidth
                           inputRef={(input) => input && input.focus()}
                           variant="outlined"
                        />
                        <Button
                           onClick={() => setAddPlayer(false)}
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
                        onClick={() => setAddPlayer(true)}
                     >
                        + Add Member
                     </Button>
                  )}
               </Box>
            </form>
         )}
         <Divider />
      </Box>
   );
};
