import { makeStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
    link: {
        float: "right",
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
        transition: "0.2s all ease-in",
        "&:hover": {
            color: purple[400],
        },
    },
    postBackground: {
        backgroundImage: "linear-gradient(180deg, rgba(21,21,22,1) 0%, rgba(13,13,13,0) 100%)",
        backgroundColor: "rgba(0,0,0,0)",
    },
    // post section
    createPostSection: {
        display: "flex",
        flexFlow: "row",
        margin: "10px 0",
        justifyContent: "flex-start",
    },
    scrimmagePost: {
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
        padding: "15px",
        margin: "10px 0",
        backgroundImage: "linear-gradient(180deg, rgba(21,21,22,1) 0%, rgba(13,13,13,0) 100%)",
    },
    gameImageContainer: {
        filter: "drop-shadow(2px 10px 3px rgba(0,0,0,0.6))",
    },
    image: {
        maxWidth: "90px",
        maxHeight: "60px",
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
    // skill icon

    cancelBtn: {
        backgroundImage: "linear-gradient(to right, #eb3941, #f15e64, #e14e53, #e2373f)",
        backgroundSize: "300% 300%",
        color: "#fafafa",
        transition: "all 0.5s ease-out",
        "&:hover": {
            backgroundPosition: "right center",
        },
    },
}));
