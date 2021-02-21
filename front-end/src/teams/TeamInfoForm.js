import { useStyles } from "./styles";
import { useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { post } from "../network";
import firebase from "firebase";
import "firebase/storage";
import {
   Alert,
   Box,
   Button,
   Container,
   CircularProgress,
   DeletableListItem,
   Divider,
   Grid,
   Slide,
   TextField,
   Typography,
} from "../ui";
import { defaultImage } from "./defaultGames";
import { GAMES as games } from "./defaultGames";
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

export const TeamInfoForm = () => {
   const [isAddingRoster, setIsAddingRoster] = useState(false);
   const [newRosterName, setNewRosterName] = useState("");
   const [name, setName] = useState("");
   const [game, setGame] = useState("");
   const [rosters, setRosters] = useState([]);
   const [loading, setLoading] = useState(false);
   const [img, setImg] = useState(null);

   // FOR DISPLAY PURPOSE
   const [active, setActive] = useState({});
   const [show, setShow] = useState(true);
   const previewRef = useRef(null);
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

      setLoading(true);
      if (img) {
         // THEN UPLOAD
         const storageRef = firebase
            .storage()
            .ref(`/teamImage/${schoolId}+${name}+${img.name}`);
         storageRef.put(img).on(
            "state_changed",
            (snapshot) => {
               console.log(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
               );
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
                        schoolId,
                        rosters,
                        url,
                     };
                     const response = await post("/api/teams", newTeamInfo);
                     const newTeamId = response.data;
                     history.push(`/teams/${newTeamId}`);
                  })
                  .catch((error) => {
                     setLoading(false);
                     console.log(error);
                  })
         );
      } else {
         const newTeamInfo = {
            name,
            game,
            schoolId,
            rosters,
            url: Object.keys(active).length !== 0 ? active.img : defaultImage,
         };
         try {
            const response = await post("/api/teams", newTeamInfo);
            const newTeamId = response.data;
            history.push(`/teams/${newTeamId}`);
         } catch (error) {
            setLoading(false);
            console.log(error);
         }
      }
   };

   const onDeleteRoster = (index) => {
      setRosters([...rosters.slice(0, index), ...rosters.slice(index + 1)]);
   };

   const onCancel = () => {
      history.push("/");
   };

   const imgfunction = (e) => {
      let selectedFile = e.target.files[0];
      if (selectedFile && TYPES.includes(selectedFile.type)) {
         setShow(false);
         setImg(selectedFile);
         previewRef.current = URL.createObjectURL(selectedFile);
         setTimeout(() => setShow(true), 500);
      }
   };

   const onSelectGame = (game) => {
      setShow(false);
      setImg(null);
      setTimeout(() => setShow(true), 500);
      setGame(game.name);
      setActive(game);
   };

   return (
      <Container maxWidth="lg">
         <Grid
            container
            style={{
               minHeight: "80vh",
            }}
         >
            <Grid item xs={12} sm={6}>
               <Box className={classes.contentContainer}>
                  <Typography className={classes.teamName}>
                     {name ? name : "Enter a team name"}
                  </Typography>
                  <Box className={classes.imageContainer}>
                     <Slide in={show} direction="right">
                        <Box
                           style={{
                              backgroundImage: img
                                 ? `url(${previewRef.current})`
                                 : Object.keys(active).length !== 0
                                 ? `url(${active.img})`
                                 : `url(${defaultImage})`,
                           }}
                           className={classes.img}
                        />
                     </Slide>
                  </Box>
                  <img
                     className={classes.controller}
                     src={controller}
                     alt="Controller-ps5"
                  />
               </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
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
                     onChange={(e) => {
                        if (Object.keys(active).length !== 0) {
                           setActive({});
                        }
                        setGame(e.target.value);
                     }}
                     fullWidth
                     label="Game"
                     variant="outlined"
                  />
               </Box>
               <Box mb={2} className={classes.gamesContainer}>
                  {games.map((game) => (
                     <Box
                        key={game.name}
                        className={
                           active.name === game.name
                              ? `${classes.game} ${classes.active}`
                              : `${classes.game}`
                        }
                        onClick={() => {
                           onSelectGame(game);
                        }}
                     >
                        {game.name}
                     </Box>
                  ))}
               </Box>
               <Divider />
               <Box my={2}>
                  <Typography variant="h6" gutterBottom>
                     Upload your game picture
                  </Typography>
                  <Button variant="contained" color="primary" component="label">
                     {img ? "Change" : "Upload"}
                     <input type="file" hidden onChange={imgfunction} />
                  </Button>
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
                     {!loading && (
                        <Grid item>
                           <Button variant="contained" onClick={onCancel}>
                              Cancel
                           </Button>
                        </Grid>
                     )}
                     <Grid item xs={loading && 12}>
                        <Button
                           color="primary"
                           variant="contained"
                           onClick={onNext}
                           disabled={loading}
                           fullWidth={loading}
                        >
                           {loading ? (
                              <CircularProgress size="2em" color="primary" />
                           ) : (
                              "Create Team"
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
