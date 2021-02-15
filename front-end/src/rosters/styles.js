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
   playerCardConatiner: {
      position: "relative",
      "&:hover": {
         "& $playerCard": {
            boxShadow: "0px 5px 15px 2px rgba(255,255,255,0.2)",
         },
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
      margin: "10px auto",
      backgroundColor: "#303030",
      padding: "20px 10px",
      borderRadius: "5px",
      boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.4)",
      cursor: "pointer",
   },
   gradient: {
      position: "absolute",
      maxWidth: "290px",
      height: "320px",
      content: '""',
      top: "50%",
      borderRadius: "5px",
      left: "50%",
      transform: "translate(-50%,-50%)",
      width: "102%",
      height: "102%",
      zIndex: "-100",
      backgroundImage:
         "linear-gradient(460deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)",
      backgroundSize: "300%",
      backgroundPosition: "right",
      animation: "$animate 20s infinite alternate",
   },
   "@keyframes animate": {
      "0%": {
         backgroundPosition: "right",
      },
      "25%": {
         backgroundPosition: "bottom",
      },
      "50%": {
         backgroundPosition: "left",
      },
      "100%": {
         backgroundPosition: "top",
      },
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
   email: {
      position: "absolute",
      bottom: "10px",
      left: "10px",
      color: "#5d5d5d",
   },
}));
