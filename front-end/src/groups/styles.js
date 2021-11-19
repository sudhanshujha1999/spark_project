import { makeStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";
const cardHeight = "80px";
const groupRadius = "20px";
const basicPseudoElementStyles = {
    top: 0,
    left: 0,
    position: "absolute",
    content: '""',
    width: "100%",
    height: "100%",
    zIndex: "0",
};

export const useStyles = makeStyles((theme) => ({
    heading: {
        position: "relative",
        minHeight: "50vh",
        width: "min(800px, 72vw)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: "80px",
    },
    bigHeading: {
        fontSize: "min(6em, 11vw)",
    },
    medHeading: {
        filter: "drop-shadow(0px 10px 3px rgba(0,0,0,0.72))",
        fontSize: "min(4em, 8vw)",
    },
    smallHeading: {
        fontSize: "1.5em",
        width: "fit-content",
        position: "relative",
        filter: "drop-shadow(0px 10px 3px rgba(0,0,0,0.72))",
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
    customScroll: {
        "&::-webkit-scrollbar": {
            width: "8px",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 10,
        },
        "&::-webkit-scrollbar-thumb": {
            borderRadius: 10,
            opacity: "0.8",
            backgroundColor: "#895cf2",
        },
    },
    // do redesign on groups card
    groupCardContainer: {
        cursor: "pointer",
        margin: "10px 0",
        backgroundColor: "#303030",
        boxShadow: "-7px 7px 22px #0c0c0c , 7px -7px 22px #343434",
        borderRadius: groupRadius,
        overflow: "hidden",
        padding: "8px 16px",
        "&:hover": {
            "& $groupCard": {
                boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
                "& $groupName": {
                    "&:before": {
                        transform: "translateX(0%)",
                    },
                },
            },
            "& $avatar": {
                boxShadow: "none",
                "&:before": {
                    opacity: 1,
                },
            },
        },
    },

    avatar: {
        height: cardHeight,
        width: cardHeight,
        fontSize: "1.5em",
        zIndex: "5",
        borderRadius: groupRadius,
        color: "#fafafa",
        transition: "all 0.2s ease-in-out",
        boxShadow: "-7px 7px 22px #0c0c0c , 7px -7px 22px #343434",
        backgroundColor: "#000000",
        backgroundImage: "linear-gradient(315deg, #202020 0%, #303030 74%)",
        "&::before": {
            ...basicPseudoElementStyles,
            boxShadow: "-7px 7px 22px #0c0c0c inset, 7px -7px 22px #343434 inset",
            opacity: 0,
            transition: "all 0.2s ease-in-out",
        },
    },
    groupCard: {
        padding: "6px 30px",
        marginLeft: "-20px",
        textOverflow: "ellipsis",
        overflow: "hidden",
        position: "relative",
        fontSize: "1em",
        textAlign: "center",
        // backgroundColor: "#272731",
        backgroundColor: "#222",
        isolation: "isolate",
        transition: "all 0.2s ease-in-out",
        zIndex: "1",
        clipPath: " polygon(0 0, 100% 0%, 85% 100%, 0% 100%)",
        boxShadow: "0px 1px 10px rgba(0,0,0,0.2)",
    },
    groupName: {
        textOverflow: "ellipsis",
        zIndex: "2",
        // color: "#895cf2",
        color: "#FFF",
        fontWeight: "600",
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
            // transform: "translateX(0%)",
            transition: "all 0.25s cubic-bezier(0.49, 0.19, 0.59, 0.99)",
        },
    },
    contentGroupBoxContainer: {
        position: "relative",
    },
    lastActivity: {
        position: "relative",
        zIndex: "1",
        "&::before": {
            ...basicPseudoElementStyles,
            width: "6px",
            height: "6px",
            backgroundColor: green[500],
            borderRadius: "50%",
            zIndex: "5",
            top: "34%",
            left: "-10px",
        },
    },
    lastActivityContainer: {
        position: "absolute",
        bottom: "10%",
        left: "10%",
    },
    groupCode: {
        padding: "5px 10px",
        width: "fit-content",
        border: `1px solid rgba(142, 36, 170 , 0.3)`,
        margin: "10px 0",
        cursor: "pointer",
    },
    // all Members Box
    membersBox: {
        width: "70%",
        padding: "10px ",
        backdropFilter: "blur(2px)",
        backgroundColor: "#303030",
        boxShadow: theme.shadows[10],
    },
    // dialog
    dialog: {
        backgroundColor: "#303030",
        padding: "16px",
        width: "700px",
    },
}));
