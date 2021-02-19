import { Box, Grid, Typography, Button, IconButton } from "../ui";
import { SettingsIcon } from "../icons";
import { useHistory } from "react-router-dom";
import { useStyles } from "./Styles";
import banner from "../img/banner.jpg";

export const TeamItemCard = ({ team, isCoach, index, editTeam = () => {} }) => {
   const classes = useStyles();
   const history = useHistory();

   const handleClick = () => {
      history.push(`/teams/${team.id}`);
   };

   return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={team.id}>
         <Box className={classes.teamCard} onClick={handleClick}>
            <Box className={classes.rank}>{index}</Box>
            <Box className={classes.background} />
            <Box className={classes.front}>
               <Box
                  className={classes.teamImg}
                  style={{
                     backgroundImage: `url(${banner})`,
                  }}
               />
               {/* <img src={banner} alt="teamImng" className={classes.teamImg} /> */}
               <Typography className={classes.teamName}>
                  {team.name}
                  {isCoach && (
                     <IconButton
                        className={classes.iconBtn}
                        onClick={(e) => {
                           {
                              e.stopPropagation();
                              editTeam(team);
                           }
                        }}
                     >
                        <SettingsIcon
                           size="small"
                           className={classes.btnIcon}
                        />
                     </IconButton>
                  )}
               </Typography>
            </Box>
            <Box className={classes.back}>
               <Typography gutterBottom className={classes.gameName}>
                  {team.game}
               </Typography>
               <Button
                  variant="contained"
                  className={classes.teamCardBtn}
                  disableElevation
                  onClick={(e) => {
                     {
                        e.stopPropagation();
                        console.log("btn");
                     }
                  }}
               >
                  See Team
               </Button>
            </Box>
         </Box>
      </Grid>
   );
};
