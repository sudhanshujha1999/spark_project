// import { purple } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";

const connectorWidth = 2;

export const useStyles = makeStyles((theme) => ({
    bracket: {
        height: "fit-content",
        justifyContent: "space-between",
        margin: "30px 0",
        position: "relative",
    },
    nextArm: {
        position: "absolute",
        backgroundColor: "transparent",
        borderColor: theme.palette.primary.main,
        borderWidth: connectorWidth,
        height: "50%",
        width: "20%",
        borderRight: "solid",
        top: "50%",
        right: "-30%",
    },
    matchContainer: {
        height: "fit-content",
        justifyContent: "space-between",
        margin: "30px 0",
        position: "relative",
    },
    matchItem: {
        width: "150px",
        padding: "10px",
        margin: "10px",
        backgroundColor: "#303030",
        textAlign: "center",
        borderRadius: "3px",
        boxShadow: theme.shadows[9],
        textOverflow: "ellipsis",
        position: "relative",
        zIndex: 2,
        "&::before, &::after": {
            position: "absolute",
            zIndex: 0,
            content: "''",
            backgroundColor: "transparent",
            borderWidth: connectorWidth,
        },
    },
    bracketItem: {
        position: "relative",
        zIndex: 2,
        "&::before, &::after": {
            position: "absolute",
            zIndex: 0,
            content: "''",
            backgroundColor: "transparent",
            borderWidth: connectorWidth,
        },
    },
    topItemBracket: {
        "&::before": {
            zIndex: 0,
            top: "50%",
            right: "-30%",
            width: "20%",
            height: "100%",
            borderRadius: "0px 3px 0px 0px",
            borderTop: "solid white",
            borderRight: "solid white",
        },
    },
    topItem: {
        "&::before": {
            top: "50%",
            right: "-20%",
            width: "20%",
            height: "100%",
            borderRadius: "0px 3px 0px 0px",
            borderTop: "solid white",
            borderRight: "solid white",
        },
    },
    bottomItem: {
        "&::before": {
            bottom: "50%",
            right: "-20%",
            width: "20%",
            height: "100%",
            borderRadius: "0px 0px 3px 0px",
            borderBottom: "solid white",
            borderRight: "solid white",
        },
    },
    bottomItemBracket: {
        "&::before": {
            bottom: "50%",
            right: "-30%",
            width: "20%",
            height: "100%",
            borderRadius: "0px 0px 3px 0px",
            borderBottom: "solid white",
            borderRight: "solid white",
        },
    },
    prevTop: {
        "&::after": {
            top: "-50%",
            left: "-10%",
            width: "10%",
            height: "100%",
            borderRadius: "0px 0px 0px 3px",
            borderBottom: "solid white",
            borderLeft: "solid white",
        },
    },
    won: {
        "&::before": {
            borderColor: theme.palette.primary.main,
            zIndex: "1",
        },
    },
}));
