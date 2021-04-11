import { makeStyles } from "@material-ui/core/styles";
import addRosterContainerBackground from "../img/tornadoBg.svg";
import purple from "@material-ui/core/colors/purple";
import teamPic from "../img/teamPic.jpg";
import red from "@material-ui/core/colors/red";

export const useStyles = makeStyles((theme) => ({
    teamBanner: {
        height: "600px",
        marginTop: "-95px",
        marginLeft: "-32px",
        width: "95vw",
        marginBottom: "50px",
        backgroundSize: "cover",
        position: "relative",
        "&::before": {
            position: "absolute",
            content: '""',
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 2,
            background: "linear-gradient(0deg, rgba(34,40,49,1) 0%, rgba(255,255,255,0) 100%)",
        },
        [theme.breakpoints.down("sm")]: {
            width: "120%",
            backgroundPosition: "top",
            height: "400px",
        },
    },
    rosterName: {
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
    },
    rosterNameItems: {
        marginRight: "10px",
    },
    fabDelete: {
        position: "absolute",
        left: "10px",
        bottom: "10px",
        color: "#eaeaea",
        backgroundColor: red[400],
        "&:hover": {
            backgroundColor: red[600],
        },
    },
    rosterEdit: {
        marginRight: 20,
    },
    rosterCancel: {
        backgroundColor: red[400],
        "&:hover": {
            backgroundColor: red[600],
        },
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
        maxWidth: "200px",
        height: "280px",
        position: "relative",
        "&:hover": {
            "& $playerCard": {
                boxShadow: "0px 5px 15px 2px rgba(255,255,255,0.2)",
            },
        },
    },
    // PLAYER CARD
    playerCard: {
        display: "flex",
        flexFlow: "column",
        position: "relative",
        zIndex: "3",
        height: "100%",
        margin: "10px auto",
        backgroundColor: "#303030",
        padding: "20px 10px",
        borderRadius: "5px",
        boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.4)",
        cursor: "pointer",
        transition: "all .2s ease-in",
    },
    gradient: {
        position: "absolute",
        maxWidth: "290px",
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
        width: "100%",
        color: "#5d5d5d",
    },

    // LOADING
    load: {
        display: "grid",
        placeItems: "center",
        height: "60vh",
    },
}));
