import { makeStyles } from "@material-ui/core/styles";
import { red, blue, purple, yellow, orange, green, grey } from "@material-ui/core/colors";
import bg from "../img/background.jpg";
const bezierValue = "cubic-bezier(0.26, 1, 0.43, 0.93)";

export const useStyles = makeStyles((theme) => ({
    // LOADING
    loading: {
        display: "grid",
        placeItems: "center",
        height: "50vh",
    },
    headingLargeWithoutUnderLine: {
        fontSize: "3em",
    },
    // headings
    headingMedium: {
        fontSize: "2.5em",
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
                "linear-gradient(90deg, rgba(213,105,255,1) 0%, rgba(68,161,240,1) 30%, rgba(250,250,250,0) 60%)",
        },
    },
    headingSmall: {
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
    // SCRIMMAGE ITEM
    scrimmagePost: {
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
        padding: "15px",
        margin: "10px 0",
        maxWidth: 650,
    },
    avatar: {
        backgroundImage: "linear-gradient(145deg, rgba(57,62,70,1) 0%, rgba(26,28,32,1) 100%)",
        color: theme.palette.secondary.main,
        boxShadow: "0px 4px 10px hsl(287deg 68% 42%)",
        animation: `$animateShadow 5s linear infinite`,
        width: "60px",
        fontSize: "1.8em",
        height: "60px",
    },
    "@keyframes animateShadow": {
        "0%": {
            boxShadow: "1px 4px 10px hsl(287deg 80% 42%)",
        },
        "20%": {
            boxShadow: "-4px 1px 10px hsl(207deg 80% 42%)",
        },
        "40%": {
            boxShadow: "1px -4px 10px hsl(17deg 80% 42%)",
        },
        "80%": {
            boxShadow: "4px 1px 10px hsl(57deg 80% 42%)",
        },
        "100%": {
            boxShadow: "1px 4px 10px hsl(287deg 80% 42%)",
        },
    },
    requestBox: {
        padding: "10px",
        margin: "10px 0",
        border: "1px solid rgba(0,0,0,0.6)",
        boxShadow: `0px 0px 10px 2px rgba(255,255,255, 0.1)`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.default,
        display: "flex",
        flexFlow: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    // ADD SESSION DIALOG
    addSessionContainer: {
        marginTop: "30px",
        padding: "25px",
        borderRadius: 5,
    },
    sessionHeading: {
        fontSize: "2.5em",
        width: "fit-content",
        margin: "0px auto",
        marginBottom: "50px",
    },
    sessionTextfield: {
        marginBottom: 20,
    },
    subtitle: {
        color: "#898989",
        margin: "10px 0 20px",
    },
    rosterLoading: {
        height: "50px",
        display: "grid",
        placeItems: "center",
    },
    rosterName: {
        padding: "10px 20px",
        width: "fit-content",
        marginRight: "10px",
        borderRadius: "5px",
        cursor: "pointer",
        backgroundColor: theme.palette.background.paper,
    },
    players: {
        borderRadius: "5px",
        backgroundColor: theme.palette.background.paper,
        padding: "10px 20px",
        border: "1px solid rgba(200,200,200,0.3)",
        margin: "10px 0",
        display: "flex",
        flexFlow: "row",
        justifyContent: "space-between",
    },
    addPlayerBox: {
        display: "flex",
        flexFlow: "column",
        alignItems: "flex-start",
    },

    // MAPS SECTION
    map: {
        display: "flex",
        flexFlow: "column",
        margin: "10px",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    },
    activeMap: {
        boxShadow: "0px 5px 10px 3px rgba(255,255,255,0.2)",
    },
    mapImage: {
        width: "100px",
        height: "100px",
        backgroundColor: "#333",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },

    // SESSION
    eventsContainer: {
        display: "flex",
        flexFlow: "row no-wrap",
        width: "90%",
        overflowX: "auto",
        padding: "10px 0",
    },
    eventGradient: {
        position: "relative",
        width: "90%",
        zIndex: 2,
        "&:before": {
            position: "absolute",
            content: '""',
            width: "30px",
            height: "100%",
            zIndex: 2,
            pointerEvents: "none",
            right: "10%",
            top: 0,
            background: "linear-gradient(-90deg, rgb(28 31 35) 20%, rgba(51,51,51,0) 86%)",
        },
    },
    container: {
        padding: "15px 25px",
        borderRadius: 5,
        width: "fit-content",
        cursor: "pointer",
        backgroundColor: "rgba(50,50,50, 0.3)",
        border: `1px solid ${theme.palette.background.paper}`,
        transition: "all 0.2s ease-in",
        boxShadow: "0px 0px 0px 0px rgba(255,255,255,0.2)",
        "&:hover": {
            backgroundColor: "rgba(50,50,50, 0.9)",
            boxShadow: "0px 0px 10px 1px rgba(255,255,255,0.2)",
            "& $vs": {
                "&:nth-child(1)": {
                    transform: "translateY(-20px)",
                    "&::before": {
                        top: "20%",
                        height: "200%",
                    },
                },
                "&:nth-child(2)": {
                    transform: "translateY(20px)",
                },
            },
        },
    },
    teams: {
        display: "flex",
        flexFlow: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 350,
        margin: "30px 0",
    },
    vs: {
        fontSize: "1.5em",
        margin: "0 20px",
        position: "relative",
        transition: "all 0.2s ease-in",
        "&:nth-child(1)": {
            transform: "translateY(0px)",
            "&::before": {
                position: "absolute",
                content: '""',
                top: "-5%",
                borderRadius: "2px",
                backgroundColor: theme.palette.secondary.main,
                right: "-23px",
                width: "2px",
                height: "120%",
                transition: "all 0.2s ease-in",
                transform: "rotate(20deg)",
            },
        },
        "&:nth-child(2)": {
            transform: "translateY(0px)",
        },
    },
    // scroll
    customScrollX: {
        "&::-webkit-scrollbar": {
            height: "8px",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 10,
        },
        "&::-webkit-scrollbar-thumb": {
            borderRadius: 10,
            opacity: "0.8",
            backgroundColor: theme.palette.secondary.main,
        },
    },
    customScrollY: {
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

    // leagure Records
    leagueContainer: {
        overflowY: "auto",
        width: "100%",
    },
    newsContainer: {
        marginRight: "20px",
        position: "relative",
    },

    dialog: {
        padding: "20px",
    },

    selectField: {
        width: "300px",
        margin: "20px 0",
    },
    // add idalog
    leftSide: {
        backgroundColor: "#242424",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        fontWeight: 600,
        backgroundBlendMode: "darken",
        display: "grid",
        placeItems: "center",
    },
    label: {
        padding: "0 5px",
        backgroundColor: theme.palette.background.paper,
    },

    newsBox: {
        width: "100%",
        backgroundColor: "rgba(50,50,50, 0.3)",
        border: `1px solid ${theme.palette.background.paper}`,
    },
    leagueMatch: {
        padding: "5px 20px",
        borderRadius: 3,
        boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.2)",
    },
    win: {
        background: "linear-gradient(135deg, rgba(100,100,100,0) 40%, rgba(38,170,44,0.2) 100%)",
    },
    lose: {
        background: "linear-gradient(135deg, rgba(100,100,100,0) 40%, rgb(205 26 26 / 20%) 100%)",
    },
    removeBtn: {
        position: "absolute",
        right: "-15px",
        top: "-15px",
        color: "#ff3c3c",
        transform: "scale(0.7) translate(-15px, 5px)",
        opacity: 0,
        transition: `all 0.5s ${bezierValue}`,
    },
    leagueName: {
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
    },
    leagueTitle: {
        fontSize: "1.5em",
        "&:nth-child(2)": {
            fontSize: "0.85em",
            color: "#888",
            marginLeft: "10px",
        },
    },

    // session information
    membersChip: {
        margin: "5px 10px",
        padding: "5px",
    },
    infoMessage: {
        padding: "5px",
        color: theme.palette.warning.main,
        background: "rgba(0,0,0,0.4)",
        borderRadius: 5,
        display: "block",
        marginTop: 5,
        width: "fit-content",
    },
    saveBtn: {
        position: "fixed",
        top: "12%",
        right: "10%",
    },
    teamsVs: {
        position: "relative",
        width: "fit-content",
    },
    vsContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        overflow: "visible",
        zIndex: "2",
        transform: "translate(-50%, -50%)",
    },
    vsSign: {
        borderRadius: "50%",
        fontSize: "2em",
        padding: "20px",
        fontWeight: 700,
        position: "relative",
        background: "linear-gradient(0deg, #000, #262626)",
        "&:before": {
            position: "absolute",
            content: '""',
            top: "-1px",
            left: "-1px",
            zIndex: "-2",
            borderRadius: "50%",
            background:
                "linear-gradient(460deg, #fd9832, #ffef2e, #9cff36, #38eefe, #357cff, #386cff, #dd23ff, #ff3183)",
            backgroundSize: "400%",
            width: "calc(100% + 2px)",
            filter: "blur(5px)",
            height: "calc(100% + 2px)",
            animation: "$animateGradient 50s linear infinite",
        },
    },
    "@keyframes animateGradient": {
        "0%": {
            backgroundPosition: "0 0",
        },
        "50%": {
            backgroundPosition: "300% 0",
        },
        "100%": {
            backgroundPosition: "0% 0",
        },
    },
    teamName: {
        margin: "20px 0px",
        display: "inline-block",
        padding: "10px 20px",
        fontSize: "1.7em",
        width: "250px",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        fontWeight: 600,
        backgroundBlendMode: "luminosity",
        borderRadius: "2px",
        "&:nth-child(2)": {
            backgroundColor: purple[500],
            textAlign: "right",
            backgroundPosition: "left",
            paddingRight: "60px",
            // background: "linear-gradient(90deg, rgba(142,36,170,1) 0%, rgba(51,51,51,1) 100%)",
            // transform: "translate(10px,-10px) rotate(-3deg)",
            transform: "translate(10px,-10px)",
            clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)",
        },
        "&:nth-child(3)": {
            backgroundColor: theme.palette.secondary.main,
            // background: "linear-gradient(-90deg, rgba(255,211,105,1) 20%, rgba(51,51,51,1) 100%)",
            paddingLeft: "60px",
            backgroundPosition: "right",
            textAlign: "left",
            // transform: "translate(-10px,10px) rotate(-3deg)",
            transform: "translate(-10px,10px)",
            clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
        },
    },
    description: {
        padding: "10px",
        backgroundColor: "rgba(0,0,0,0.2)",
        width: "min(500px, 90%)",
        borderRadius: "4px",
    },
    // ALL STAGES LIST
    stagesContainer: {
        marginTop: 20,
    },
    date: {
        color: "#a5a5a5",
        fontSize: "1em",
    },
    listItem: {
        borderRadius: "5px",
        fontSize: "1.5em",
        marginBottom: "20px",
    },
    stageNameContainer: {
        display: "flex",
        flexFlow: "row",
    },
    stageTitle: {
        padding: "12px 25px 12px 15px",
        alignItems: "center",
        cursor: "pointer",
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "0 5px 5px 0",
    },
    indexNumber: {
        padding: "12px 25px 12px 15px",
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        paddingRight: 15,
        borderRadius: "5px 0 0 5px",
        fontSize: "1.5em",
        marginRight: "5px",
        marginBottom: "20px",
    },

    // MULTI PURPOSE
    flexRow: {
        display: "flex",
        flexFlow: "row",
    },
    // MULTI PURPOSE

    deleteBtn: {
        backgroundImage: "linear-gradient(to right, #eb3941, #f15e64, #e14e53, #e2373f)",
        backgroundSize: "300% 300%",
        color: "#fafafa",
        transition: "all 0.5s ease-out",
        "&:hover": {
            backgroundPosition: "right center",
        },
    },
    // DRAWING BOARD
    drawingComponent: {
        position: "relative",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    rowContainer: {
        display: "flex",
        flexFlow: "row",
    },
    color: {
        marginRight: "10px",
        width: 30,
        height: 30,
        borderRadius: "50%",
        transition: "all 0.1s ease-out",
        cursor: "pointer",
        "&:hover": {
            transform: "scale(1.05)",
        },
    },
    active: {
        boxShadow: "0px 0px 0px 3px rgba(255,255,255,1)",
    },
    canvasContainer: {
        position: "relative",
        // width: "625px",
        // height: "600px",
        boxShadow: "0px 0px 15px 2px rgba(0,0,0,0.2)",
    },
    backgroundCanvas: {
        position: "absolute",
        top: 0,
        // width: "625px",
        // height: "600px",
        left: 0,
        zIndex: "-2",
    },
    downloadCanvas: {
        position: "absolute",
        top: 0,
        // width: "625px",
        // height: "600px",
        left: 0,
        zIndex: "-100",
    },
}));

export const colors = [
    {
        name: "White",
        color: grey[100],
    },
    {
        name: "Black",
        color: "#000",
    },
    {
        name: "Red",
        color: red[500],
    },
    {
        name: "Blue",
        color: blue[500],
    },
    {
        name: "Yellow",
        color: yellow[500],
    },
    {
        name: "Green",
        color: green[500],
    },
    {
        name: "Orange",
        color: orange[500],
    },
    {
        name: "Purple",
        color: purple[500],
    },
];
