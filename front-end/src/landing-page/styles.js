import { makeStyles } from "@material-ui/core/styles";
import banner from "../img/1624.jpg";
import addRosterContainerBackground from "../img/tornadoBg.svg";
import purple from "@material-ui/core/colors/purple";

export const useStyles = makeStyles((theme) => ({
    pageLoad: {
        height: "90vh",
        display: "grid",
        placeItems: "center",
    },
    // ALL BANNER STYLES WITHE HEADING
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        zIndex: "-2",
    },
    img: {
        height: "85vh",
        width: "100%",
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        position: "relative",
        "&::before": {
            position: "absolute",
            content: '""',
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 2,
            background:
                "linear-gradient(180deg, rgba(34,40,49,0.70) 20%, rgba(255,255,255,0) 100%)",
        },
    },
    // wave: {
    //     position: "absolute",
    //     top: 10,
    //     left: 0,
    //     width: "270%",

    //     // transform: "translateX(0%)",
    //     animation: " $wavey linear 30s infinite",
    // },
    // "@keyframes wavey": {
    //     "0%": {
    //         transform: "translateX(-30%)",
    //     },
    //     "100%": {
    //         transform: "translateX(-70%)",
    //     },
    // },

    // HEADING
    headingContainer: {
        width: "min(95vw, 700px)",
        minHeight: "90vh",
        margin: "0 auto",
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    formHeading: {
        margin: "20px 0",
        fontSize: "min(2em, 8vw)",
    },
    bannerHeading: {
        fontWeight: 700,
        lineHeight: "1em",
        marginBottom: "15px",
        fontSize: "min(4em, 14vw)",
    },
    body: {
        marginBottom: "15px",
        fontSize: "min(1.4em,8vw)",
        color: "#dedede",
    },
    nameOrg: {
        position: "relative",
        "&::before": {
            position: "absolute",
            content: '""',
            bottom: "-4px",
            left: "0",
            borderRadius: "5px",
            backgroundColor: "#ffd369",
            width: "0%",
            height: "4px",
            animation: "$intro 2s linear forwards",
            animationDelay: "2.5s",
        },
    },
    "@keyframes intro": {
        "0%": {
            width: "0%",
        },
        "100%": {
            width: "100%",
        },
    },
    textfield: {
        margin: "10px 0",
        borderRadius: 2,
        minWidth: 340,
        // clipPath: "polygon(10% 0, 100% 0%, 90% 100%, 0% 100%)",
        background: "rgb(57 62 70 / 60%)",
        filter: "drop-shadow(10px 10px 15px black)",
        backdropFilter: "blur(1px)",
    },
    selectContainer: {
        display: "flex",
        flexFlow: "row",
        minWidth: 340,
        justifyContent: "space-between",
    },
    select: {
        minWidth: 160,
    },
    label: {
        color: "#fff",
        "&.Mui-focused": {
            color: "#c5c5c5",
        },
        "&.MuiInputLabel-shrink": {
            color: "#c5c5c5",
        },
    },
    btn: {
        position: "relative",
        borderRadius: 2,
        transition: "all 100ms ease-in",
        marginTop: 10,
        background: "#ffd369",
        animation: "$pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1)",
        "&:hover": {
            animation: "none",
            background: "#cba956",
        },
    },
    "@keyframes pulse": {
        "0%": {
            boxShadow: "0px 0px 0px 0px rgba(232, 207, 61, 0.9)",
        },
        "100%": {
            boxShadow: "0px 0px 0px 15px rgba(232, 207, 61, 0)",
        },
    },
    error: {
        padding: "10px 25px",
        margin: "20px 0",
        borderRadius: 2,
        border: "1px solid rgb(201 33 33 / 60%)",
        backgroundColor: "rgb(201 33 33 / 35%)",
    },
    success: {
        display: "flex",
        flexFlow: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    checkConatiner: {
        marginLeft: "20px",
        width: "55px",
    },
    checkSvg: {
        animation: "$pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1)",
        borderRadius: "50%",
    },
    checkmark: {
        strokeDasharray: " 80px 80px",
        strokeDashoffset: "-80px",
        animation: "$checkAnimate 1s forwards cubic-bezier(0.895, 0.03, 0.685, 0.22)",
    },
    "@keyframes checkAnimate": {
        "0%": {
            strokeDashoffset: "-80px",
        },
        "100%": {
            strokeDashoffset: "0px",
        },
    },

    // HEADING FOR A LOGGED IN USER
    btnGrp: {
        display: "flex",
        flexFlow: "row",
        backgroundColor: "rgba(0,0,0,0.1)",
    },
    normalBtn: {
        marginRight: "10px",
    },

    // FORM DIALOG
    addRosterContainer: {
        padding: "50px",
        display: "flex",
        flexFlow: "column",
        alignItems: "flex-start",
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

    // CARD STYLES
    cardContainer: {
        width: "min(700px, 95vw)",
        minHeight: 350,
        display: "flex",
        flexFlow: "column",
        margin: "50px auto 0",
        padding: "30px",
        position: "relative",
        "&:hover": {
            "& $cardHeading": {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 100% 100%, 0 100%, 0 0)",
            },
            "& $cardBg": {
                transform: "scale(1.05)",
            },
        },
    },
    cardBorder: {
        position: "absolute",
        top: "-33%",
        left: "-14%",
        width: "124%",
        height: "150%",
        zIndex: "-1000",
        filter: "drop-shadow(2px 4px 6px black)",
        transform: "scale(1)",
        transition: "all 0.2s ease-out",
    },
    cardBg: {
        position: "absolute",
        top: 0,
        height: "350px",
        objectPosition: "center",
        // zIndex: "-100",
        // backgroundImage: `url(${char})`,
        // backgroundPosition: "center",
        // backgroundSize: "cover",
        transform: "scale(1)",
        filter: "drop-shadow(3px 5px 10px rgb(0 0 0 / 90%))",
        zIndex: "-100",
        transition: "all 0.2s ease-out",
    },
    cardBgRight: {
        right: 0,
    },
    cardBgLeft: {
        left: 0,
    },
    infoContainerLeft: {
        marginLeft: "30%",
    },
    infoContainerRight: {
        marginRight: "30%",
    },
    cardHeading: {
        fontSize: "1.8em",
        width: "fit-content",
        margin: "25px 0",
        border: "1px solid white",
        borderRadius: "5px",
        padding: "10px 25px",
        transition: "0.2s all cubic-bezier(1, 1.93, 1, 1)",
        clipPath: "polygon(40% 0, 100% 0, 100% 60%, 60% 100%, 0 100%, 0 40%)",
    },
}));
