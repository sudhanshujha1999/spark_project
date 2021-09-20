import { makeStyles } from "@material-ui/styles";
import { purple } from "@material-ui/core/colors";

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
    smallHeading: {
        fontSize: "1.5em",
        width: "fit-content",
        position: "relative",
        "&:before": {
            position: "absolute",
            content: '""',
            width: "150%",
            height: "3px",
            bottom: "-6px",
            left: 0,
            borderRadius: "0px 5px 5px 15px",
            zIndex: "2",
            background:
                "linear-gradient(90deg, #ffef2e 0%, rgb(240 100 68) 30%, rgba(250,250,250,0) 60%)",
        },
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
        overflow: "hidden",
        position: "relative",
        fontSize: "1em",
        textAlign: "center",
        backgroundColor: "#272731",
        isolation: "isolate",
        cursor: "pointer",
        transition: "all 0.2s ease-out",
        boxShadow: "0px 1px 5px rgba(20,20,20,0.4) inset",
        zIndex: "1",
        "&:hover": {
            boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
            "& $groupName": {
                "&:before": {
                    transform: "translateX(0%)",
                },
            },
        },
    },
    groupName: {
        zIndex: "2",
        color: "#895cf2",
        fontSize: "1.5em",
        fontWeight: 700,
        "&:before": {
            position: "absolute",
            mixBlendMode: "difference",
            top: 0,
            left: 0,
            content: '""',
            zIndex: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "currentColor",
            transform: "translateX(-110%)",
            transition: "all 0.5s cubic-bezier(0, 0.4, 0.57, 1.44)",
        },
    },
    groupCode: {
        padding: "5px 10px",
        width: "fit-content",
        border: `1px solid rgba(142, 36, 170 , 0.3)`,
        margin: "10px 0",
        cursor: "pointer",
    },
    // all Memebrs Box
    membersBox: {
        width: "70%",
        padding: "10px ",
        backdropFilter: "blur(2px)",
        backgroundColor: "#18161a",
    },
}));
