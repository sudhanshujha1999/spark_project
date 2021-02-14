import { makeStyles } from "@material-ui/core/styles";
import addRosterContainerBackground from "../img/tornadoBg.svg";
import purple from "@material-ui/core/colors/purple";

export const useStyles = makeStyles((theme) => ({
   rosterName: {
      display: "flex",
      flexFlow: "row",
      alignItems: "center",
   },
   rosterNameItems: {
      marginRight: "10px",
   },
   addRosterContainer: {
      width: "min(600px, 90vw)",
      height: "50vh",
      display: "flex",
      padding: "0 20px",
      flexFlow: "column",
      backgroundImage: `url(${addRosterContainerBackground})`,
      backgroundColor: "#7b7b7b",
      backgroundSize: "cover",
      backgroundPosition: "bottom",
      backgroundBlendMode: "multiply",
      border: "1px solid rgba(255,255,255,0.1)",
   },
   inputConatiner: {
      boxShadow: "0px 0px 10px 3px rgba(0,0,0,0.3)",
      backgroundColor: "rgba(0,0,0,0.1)",
      backdropFilter: "blur(10px)",
   },
   heading: {
      fontSize: "2.5em",
      fontWeight: 700,
      margin: "50px 0 20px",
   },
   submitBtn: {
      width: "100px",
      margin: "15px 0",
      fontWeight: "600",
      color: "#eaeaea",
      backgroundColor: purple[600],
      "&:hover": {
         backgroundColor: purple[800],
      },
   },
}));
