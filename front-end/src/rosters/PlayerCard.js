import { Box, Typography } from "../ui";
import { useStyles } from "./styles";
import Fade from "@material-ui/core/Fade";
import { Zoom } from "@material-ui/core";

export const PlayerCard = ({
   index = 1,
   teamId,
   rosterId,
   playerId,
   bio,
   email,
   playerName,
   gamerName,
   show = true,
}) => {
   const classes = useStyles();
   return (
      <Zoom
         in={show}
         style={{
            transitionDelay: show ? `${(index + 2) * 50}ms` : "0ms",
         }}
      >
         <Box
            style={{
               position: "relative",
            }}
         >
            <Box className={classes.gradient} />
            <Box className={classes.playerCard}>
               <Box className={classes.teamImage} />
               <Typography
                  variant="h6"
                  className={classes.playerName}
                  gutterBottom
               >
                  {playerName}
               </Typography>
               <Typography variant="h4" color="primary" gutterBottom>
                  {gamerName}
               </Typography>
               <Typography variant="subtitle2">{bio}</Typography>
            </Box>
         </Box>
      </Zoom>
   );
};
