import { makeStyles } from "@material-ui/core/styles";
// import purple from "@material-ui/core/colors/purple";
import blue from "@material-ui/core/colors/blue";
const bezierValue = "cubic-bezier(0.26, 1, 0.43, 0.93)";

export const useStyles = makeStyles((theme) => ({
    orgName: {
        position: "relative",
        width: "fit-content",
        "&:before": {
            position: "absolute",
            content: '""',
            width: "110%",
            height: "110%",
            top: "-5%",
            left: "-5%",
            borderRadius: "1px",
            border: "2px solid",
            borderColor: theme.palette.secondary.main,
            clipPath:
                "polygon(20% 0%, 100% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 100%, 0% 20%)",
            animation: "$animateClipPath 5s linear infinite alternate",
        },
    },
    "@keyframes animateClipPath": {
        "0%": {
            borderRadius: "1px",
            filter: "hue-rotate(0deg)",
            clipPath:
                "polygon(100% 0%, 100% 0, 100% 0%, 100% 0%, 0% 100%, 0% 100%, 0 100%, 0% 100%)",
        },
        "100%": {
            filter: "hue-rotate(180deg)",
            borderRadius: "10px",
            clipPath:
                "polygon(20% 0%, 100% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 100%, 0% 20%)",
        },
    },
    // CARD STYLES
    cardStyles: {
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        height: "200px",
        position: "relative",
        cursor: "pointer",
        padding: "10px",
    },
    cardActions: {
        position: "absolute",
        top: 10,
        right: 10,
        display: "flex",
        flexFlow: "row",
    },
    textfield: {
        pointerEvents: "none",
    },
    // INPUT WHEN DISABLED
    input: {
        fontSize: "min(4vw,1.5em)",
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    btn: {
        zIndex: 10,
    },
    fab: {
        position: "absolute",
        bottom: 20,
        right: 50,
    },
    // NEW TEAM CARD
    teamCard: {
        // margin: "0 auto",
        position: "relative",
        zIndex: "10",
        width: "200px",
        cursor: "pointer",
        "&:hover": {
            zIndex: "15",
            "& $background": {
                transition: `all 250ms ${bezierValue}`,
                transform: "scale(1.3)",
                opacity: 1,
            },
            "& $teamImg": {
                boxShadow: "0px 5px 10px rgba(0,0,0,0.3)",
            },
            "& $rank": {
                top: "-15%",
                right: "-7%",
                backgroundColor: "rgba(0,0,0,0.6)",
            },
            "& $front": {
                transform: "translateY(-35%) scale(0.78)",
                "& $teamName": {
                    // color: "red",
                    transform: "scale(1.2)",
                    animation: "$animateName 250ms linear forwards",
                },
            },
            "& $iconBtn": {
                opacity: 1,
                transition: `all 250ms ${bezierValue}`,
            },
            "& $back": {
                opacity: 1,
                transition: `all 250ms ${bezierValue}`,
            },
        },
    },
    rank: {
        position: "absolute",
        padding: "15px 10px",
        clipPath: " polygon(100% 0%, 100% 100%, 50% 81%, 0 100%, 0 0)",
        backgroundColor: "rgba(0,0,0,0.8)",
        color: "#fafafa",
        top: "-1px",
        right: "15%",
        zIndex: "5",
        fontSize: "1.1em",
        fontWeight: 600,
        transition: `all 250ms ${bezierValue}`,
    },
    front: {
        zIndex: "5",
        transition: `all 250ms ${bezierValue}`,
    },
    teamImg: {
        zIndex: "5",
        width: "100%",
        height: "250px",
        backgroundSize: "cover",
        backgroundPosition: "top",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0)",
    },
    teamName: {
        position: "relative",
        zIndex: "5",
        margin: "10px 0",
        fontSize: "1.3em",
        color: "#fff",
        textAlign: "left",
        opacity: 1,
    },
    "@keyframes animateName": {
        "0%": {
            opacity: "0",
            textAlign: "left",
        },
        "40%": {
            opacity: "0",
            textAlign: "left",
        },
        "50%": {
            opacity: "0",
            textAlign: "center",
        },
        "100%": {
            marginTop: 20,
            opacity: "1",
            textAlign: "center",
            fontSize: "1.2em",
            color: blue[400],
            fontWeight: 600,
        },
    },
    iconBtn: {
        opacity: 0,
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        right: "-3px",
        backgroundColor: "transparent",
        "&:hover": {
            backgroundColor: "transparent",
            transform: "scale(1.1) translateY(-49%)",
            "& $btnIcon": {
                color: theme.palette.secondary.main,
                transform: "rotate(175deg)",
            },
        },
    },
    btnIcon: {
        transition: "all 500ms ease-in",
    },
    background: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        borderRadius: "10px",
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 10px 10px rgba(0,0,0,0.4)",
        zIndex: "-1",
        transform: "scale(0.2,0.8)",
        opacity: "0",
    },
    back: {
        opacity: 0,
        position: "absolute",
        width: "100%",
        top: "60%",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
    },
    gameName: {
        fontSize: "1.4em",
        fontWeight: 700,
    },
    teamCardBtn: {
        marginTop: "50px",
        borderRadius: "20px",
        "&:hover": {
            boxShadow: "0px 5px 10px rgba(0,0,0,0.4)",
        },
    },

    // NEWS BOX
    newsContainer: {
        maxHeight: "250px",
        overflowY: "scroll",
        marginRight: "20px",
        position: "relative",
    },

    dialog: {
        display: "flex",
        flexFlow: "column",
        padding: "20px",
        alignItems: "flex-start",
    },

    selectField: {
        width: "300px",
        margin: "20px 0",
    },

    label: {
        padding: "0 5px",
        backgroundColor: theme.palette.background.paper,
    },
    // Custom Scrollbar

    customScroll: {
        "&::-webkit-scrollbar": {
            width: "8px",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 10,
        },
        "&::-webkit-scrollbar-thumb": {
            borderRadius: 10,
            opacity: "0.8",
            backgroundColor: theme.palette.secondary.main,
        },
    },

    // Overlay
    overlay: {
        height: 20,
        position: "relative",
        "&:before": {
            position: "absolute",
            content: '""',
            width: "100%",
            height: "300%",
            top: "-60px",
            left: 0,
            zIndex: "2",
            pointerEvents: "none",
            background: "linear-gradient(0deg, rgba(34,40,49,1) 0%, rgba(255,255,255,0) 100%)",
        },
    },

    newsBox: {
        width: "90%",
        minHeight: "100px",
        padding: "20px",
        backgroundColor: "rgba(0,0,0,0.4)",
        borderRadius: "5px",
        boxShadow: "0px 10px 15px 0px rgba(50,50,50,0.1)",
        margin: "20px 0",
    },
}));
