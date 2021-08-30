import { makeStyles } from "@material-ui/styles";
// import background from "../img/background.jpg";
import background from "../img/bg-2.svg";

export const useStyles = makeStyles((theme) => ({
    background: {
        width: "110vw",
        top: 0,
        left: 0,
        height: "110vh",
        position: "fixed",
        zIndex: "-100000",
        opacity: "0.8",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
    },
    profileDetails: {
        display: "flex",
        flexFlow: "column",
        margin: "20px auto",
        width: "95%",
        justifyContent: "center",
        alignItems: "center",
    },
    avatar: {
        height: 200,
        width: 200,
    },
    uploadBtn: {
        backgroundColor: theme.palette.background.default,
        "&:hover": {
            backgroundColor: "#1c1c1c",
        },
    },
    icon: {
        fontSize: 200,
        fill: theme.palette.background.default,
        borderRadius: "50%",
    },
    detailsContent: {
        marginTop: "30px",
    },
    name: {
        textAlign: "center",
        fontSize: "min(4em, 7vw)",
    },
    gamerName: {
        position: "relative",
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: theme.spacing(3),
        "&>h3": {
            marginLeft: "10px",
            textAlign: "center",
            fontSize: "min(1.5em, 4vw)",
        },
        "&>h6": {
            marginLeft: "10px",
            textAlign: "center",
            fontSize: "min(1.3em, 3.4vw)",
        },
    },
    discordBtn: {
        color: "#fff",
        "&:hover": {
            color: "#5865F2",
        },
    },
    gridItem: {
        padding: "10px",
    },
    sectionHeading: {
        display: "flex",
        flexFlow: "row",
        marginBottom: "20px",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        "&>p": {
            fontSize: "min(2em, 5vw)",
            marginLeft: "15px",
        },
        "&::before": {
            position: "absolute",
            content: '""',
            bottom: "-3px",
            width: "30%",
            height: "3px",
            borderRadius: "0 50% 0 50%",
            backgroundColor: theme.palette.primary.main,
        },
    },
    userBio: {
        borderRadius: "5px",
        border: "1px solid rgba(200,200,200,0.2)",
        backgroundColor: "#1a1c21",
    },
    sectionBio: {
        justifyContent: "flex-start",
    },
    textCenter: {
        textAlign: "center",
    },
    noGames: {
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        "&>p": {
            fontSize: "min(1.2em, 5vw)",
            marginLeft: "15px",
            color: "#8b8c8d",
        },
        "&>svg": {
            fill: "#8b8c8d",
        },
    },
    load: {
        height: "200px",
        display: "grid",
        placeItems: "center",
    },
    savingImage: {
        height: 200,
        width: 200,
        display: "grid",
        placeItems: "center",
    },
    speedDial: {
        transform: "translateX(70px)",
    },
    fab: {
        height: 45,
        width: 45,
    },
    // NOTES
    note: {
        padding: "10px 20px",
        marginBottom: "15px",
        boxShadow: "0px 5px 5px rgba(0,0,0,0.2)",
    },
}));
