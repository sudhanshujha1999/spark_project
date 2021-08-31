import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
    heading: {
        position: "relative",
        minHeight: "50vh",
        width: "min(800px, 72vw)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: "80px",
        justifyContent: "center",
    },
    bigHeading: {
        fontSize: "min(6em, 11vw)",
    },
    medHeading: {
        fontSize: "min(4em, 8vw)",
    },
    subHeading: {
        fontSize: "min(1.5em, 2.5vw)",
        padding: "10px 20px",
        backdropFilter: "blur(15px)",
        backgroundImage: "linear-gradient(45deg, rgba(51,51,51,0) 0%, rgb(131 48 75 / 40%) 100%)",
        // border: "1px solid rgba(255, 255, 255, 0.125)",
    },
    buttons: {
        fontSize: "1.15em",
        texAlign: "center",
        width: "250px",
    },
    headingPicture: {
        position: "absolute",
        width: "min(600px, 100vw)",
        minHeight: "130%",
        content: "''",
        top: "-32px",
        right: "-40%",
        backgroundImage: "url(https://source.unsplash.com/SXGVliZGS7I)",
        zIndex: "-3",
        backgroundSize: "cover",
        backgroundPositon: "center",
    },
    // do redesig on groups card
    groupCard: {
        padding: "10px 20px",
        width: "95%",
        fontSize: "1em",
        textAlign: "center",
        backgroundColor: theme.palette.background.paper,
        cursor: "pointer",
        transition: "all 0.2s ease-out",
        "&:hover": {
            fontSize: "1.2em",
        },
    },
}));
