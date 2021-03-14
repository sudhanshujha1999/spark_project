import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
