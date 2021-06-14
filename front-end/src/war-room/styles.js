import { makeStyles } from "@material-ui/core/styles";
import { red, blue, purple, yellow, orange, green, grey } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
    // LOADING
    loading: {
        display: "grid",
        placeItems: "center",
        height: "50vh",
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

    // SESSION LIST
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
            boxShadow: "0px 5px 15px 2px rgba(255,255,255,0.2)",
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
    row: {
        display: "flex",
        flexFlow: "row",
    },
    // MULTI PURPOSE

    deleteBtn: {
        backgroundColor: red[400],
        "&:hover": {
            backgroundColor: red[600],
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
        width: "625px",
        height: "600px",
        boxShadow: "0px 0px 15px 2px rgba(0,0,0,0.2)",
    },
    backgroundCanvas: {
        position: "absolute",
        top: 0,
        width: "625px",
        height: "600px",
        left: 0,
        zIndex: "-2",
    },
    downloadCanvas: {
        position: "absolute",
        top: 0,
        width: "625px",
        height: "600px",
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
