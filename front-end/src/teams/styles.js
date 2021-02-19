import { makeStyles } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";

export const useStyles = makeStyles((theme) => ({
   contentContainer: {
      position: "relative",
      display: "flex",
      flexFlow: "column",
      padding: "10px 20px",
   },
   teamName: {
      padding: "10px 20px",
      width: "fit-content",
      clipPath: "polygon(15% 0, 100% 0, 100% 50%, 85% 100%, 0 100%, 0% 50%)",
      border: "2px solid",
      borderRadius: "5px",
      borderColor: purple[600],
      fontSize: "1.3em",
      marginBottom: 30,
   },
   img: {
      width: "320px",
      height: "410px",
      backgroundColor: "#333",
      position: "relative",
      backgroundSize: "cover",
      backgroundPosition: "top",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
      "&::before": {
         content: '""',
         position: "absolute",
         bottom: "-13%",
         right: "-18%",
         width: "70%",
         height: "70%",
         zIndex: "-1",
         backgroundImage:
            "linear-gradient(126deg, rgba(69,44,141,1) 0%, rgba(18,26,48,1) 100%)",
      },
   },
   controller: {
      position: "absolute",
      width: "150px",
      bottom: "-10px",
      left: 250,
      transform: "rotate(-20deg)",
      filter: "drop-shadow(0 15px 10px rgba(0,0,0,0.5))",
   },
}));
