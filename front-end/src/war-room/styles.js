import { makeStyles } from "@material-ui/core/styles";
import { red, blue, purple, yellow, orange, green, grey } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
    // ALL STAGES LIST
    stagesContainer: {
        marginTop: 20,
    },
    listItem: {
        borderRadius: "5px",
        fontSize: "1.5em",
        marginBottom: "20px",
    },
    stageTitle: {
        cursor: "pointer",
        padding: "12px 25px",
        backgroundColor: theme.palette.background.paper,
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
