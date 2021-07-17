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
    scrimmagePost: {
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
        padding: "15px",
        margin: "10px 0",
        maxWidth: 450,
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
}));
