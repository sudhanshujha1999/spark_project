import { makeStyles } from "@material-ui/core/styles";
import addRosterContainerBackground from "../img/tornadoBg.svg";
import purple from "@material-ui/core/colors/purple";
import teamPic from "../img/teamPic.jpg";

export const useStyles = makeStyles((theme) => ({
   rosterName: {
      display: "flex",
      flexFlow: "row",
      alignItems: "center",
   },
   rosterNameItems: {
      marginRight: "10px",
   },
   accordianConatiner: {
      backgroundColor: "transparent",
      boxShadow: "0px 0px 15px 2px rgb(255 255 255 / 10%)",
   },
   accordianDetails: {
      flexFlow: "column",
   },
   accordianSummary: {
      margin: 0,
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
   // PLAYER CARD
   playerCard: {
      maxWidth: "280px",
      display: "flex",
      flexFlow: "column",
      position: "relative",
      height: "320px",
      zIndex: "3",
      backgroundColor: "#303030",
      padding: "20px 10px",
      borderRadius: "5px",
      boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.4)",
      // "&::before": {
      // },
   },
   gradient: {
      position: "absolute",
      content: '""',
      top: "50%",
      borderRadius: "5px",
      left: "50%",
      transform: "translate(-50%,-50%)",
      width: "102%",
      height: "102%",
      zIndex: "-100",
      background:
         "linear-gradient(138deg, rgba(174,33,205,1) 0%, rgba(43,67,239,1) 100%)",
   },
   teamImage: {
      position: "absolute",
      top: "-35px",
      left: "-20px",
      // transform: "translateX(-50%)",
      width: "70px",
      height: "70px",
      zIndex: "200",
      borderRadius: "50%",
      backgroundImage: `url(${teamPic})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      boxShadow: "0px 5px 10px 2px rgba(0,0,0,0.2)",
   },
   playerName: {
      marginTop: "50px",
   },
}));
