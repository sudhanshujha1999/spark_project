import { useStyles } from "./styles";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { post } from "../network";
import {
   Alert,
   Box,
   Button,
   Container,
   DeletableListItem,
   Divider,
   Grid,
   TextField,
   Typography,
} from "../ui";
import banner from "../img/test.jpg";
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

export const TeamInfoForm = () => {
   const [isAddingRoster, setIsAddingRoster] = useState(false);
   const [newRosterName, setNewRosterName] = useState("");
   const [name, setName] = useState("");
   const [game, setGame] = useState("");
   const [rosters, setRosters] = useState([]);
   const [validationErrors, setValidationErrors] = useState([]);
   const classes = useStyles();

   const history = useHistory();
   const { schoolId } = useParams();

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

      const newTeamInfo = {
         name,
         game,
         schoolId,
         rosters,
      };
      const response = await post("/api/teams", newTeamInfo);
      const newTeamId = response.data;
      history.push(`/teams/${newTeamId}`);
   };

   const onDeleteRoster = (index) => {
      setRosters([...rosters.slice(0, index), ...rosters.slice(index + 1)]);
   };

   const onCancel = () => {
      history.push("/");
   };

   return (
      <Container maxWidth="lg">
         <Grid container>
            <Grid xs={12} sm={6}>
               <Box className={classes.contentContainer}>
                  <Typography className={classes.teamName}>
                     {name ? name : "Enter a team name"}
                  </Typography>
                  <Box
                     style={{
                        backgroundImage: `url(${banner})`,
                     }}
                     className={classes.img}
                  />
                  <img
                     className={classes.controller}
                     src={controller}
                     alt="Controller-ps5"
                  />
               </Box>
            </Grid>
            <Grid xs={12} sm={6}>
               <h1>New Team Info</h1>
               {validationErrors.map((error) => (
                  <Box mb={2}>
                     <Alert severity="error">{error}</Alert>
                  </Box>
               ))}
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
                     onChange={(e) => setGame(e.target.value)}
                     fullWidth
                     label="Game"
                     variant="outlined"
                  />
               </Box>
               <Divider />
               <Box mb={2}>
                  <h3>Team Rosters:</h3>
               </Box>
               <Box mb={2}>
                  {rosters.map((roster, i) => (
                     <>
                        <DeletableListItem
                           onRequestDelete={onDeleteRoster}
                           index={i}
                        >
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
                           label="Roster Name"
                           variant="outlined"
                        />
                        <Button
                           style={{ flex: 1, marginRight: 8 }}
                           onClick={() => setIsAddingRoster(false)}
                           color="primary"
                           variant="contained"
                        >
                           Cancel
                        </Button>
                        <Button
                           color="primary"
                           style={{ flex: 1 }}
                           onClick={() => {
                              setRosters([...rosters, { name: newRosterName }]);
                              setIsAddingRoster(true);
                              setNewRosterName("");
                           }}
                           variant="contained"
                        >
                           Add
                        </Button>
                     </>
                  ) : (
                     <Button
                        onClick={() => setIsAddingRoster(true)}
                        color="primary"
                        variant="contained"
                     >
                        + Add Roster
                     </Button>
                  )}
               </Box>
               <Divider />
               <Box py={2}>
                  <Grid container justify="space-between">
                     <Grid item>
                        <Button variant="contained" onClick={onCancel}>
                           Cancel
                        </Button>
                     </Grid>
                     <Grid item>
                        <Button
                           color="primary"
                           variant="contained"
                           onClick={onNext}
                        >
                           Create Team
                        </Button>
                     </Grid>
                  </Grid>
               </Box>
            </Grid>
         </Grid>
      </Container>
   );
};
