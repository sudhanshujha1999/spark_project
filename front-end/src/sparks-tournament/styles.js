import { makeStyles } from "@material-ui/styles";

const basicPseudoElementStyles = {
    left: 0,
    position: "absolute",
    content: '""',
    width: "100%",
    height: "100%",
    zIndex: "0",
};

const sidePanelWidth = 250;

export const useStyles = makeStyles((theme) => ({
    gamesContainer: {
        maxHeight: "50vh",
        overflowY: "auto",
    },
    customScrollY: {
        "&::-webkit-scrollbar": {
            width: "4px",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: "2px",
        },
        "&::-webkit-scrollbar-thumb": {
            borderRadius: "2px",
            boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
            backgroundColor: theme.palette.secondary.main,
        },
    },
    gameBox: {
        cursor: "pointer",
        width: "170px",
        height: "200px",
        padding: "10px",
        margin: "5px auto",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "relative",
        overflow: "visible",
        zIndex: "2",
        "&:hover": {
            boxShadow: theme.shadows[20],
            "& $overlay": {
                "&:after": {
                    height: "60%",
                },
            },
        },
    },
    active: {
        position: "relative",
        "&:before": {
            ...basicPseudoElementStyles,
            top: 0,
            zIndex: "-1",
            boxShadow: "0px 0px 8px 3px rgba(255,255,255,0.9)",
        },
    },
    imageContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },
    image: {
        width: "100%",
        height: "100%",
        backgroundPosition: "center",
        backgroundSize: "cover",
    },
    overlay: {
        position: "relative",
        zIndex: "-3",
        "&:before": {
            ...basicPseudoElementStyles,
            top: 0,
            zIndex: "-2",
            backgroundColor: "rgba(0,0,0,0.6)",
        },
        "&:after": {
            transitionTimingFunction: theme.transitions.easing.easeInOut,
            transitionDuration: theme.transitions.duration.short,
            ...basicPseudoElementStyles,
            bottom: 0,
            height: "35%",
            zIndex: "-1",

            backgroundImage:
                "linear-gradient(0deg, rgba(78, 58, 124, 0.7) 0%, rgba(0,212,255,0) 100%)",
        },
    },
    content: {
        zIndex: "100",
        display: "flex",
        height: "100%",
    },
    gameName: {
        zIndex: "2",
        fontWeight: "600",
        color: "#fafafa",
        margin: "auto auto 20px auto",
    },
    gameImage: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: "-1",
        backgroundColor: "#d3e3ff",
        backgroundPosition: "top",
        backgroundSize: "cover",
        height: "100%",
        width: "100%",
    },

    // tournament control panel
    nullifyBasicPadding: {
        marginTop: "-32px",
        marginLeft: "-31px",
    },
    backgroundSideControl: {
        backgroundColor: "#030303",
    },
    defaultPadding: {
        paddingTop: "32px",
        paddingLeft: 31,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "250px 1fr",
    },
}));
