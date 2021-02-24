import { makeStyles } from "@material-ui/core/styles";
import banner from "../img/default-image.jpg";

export const useStyles = makeStyles((theme) => ({
    container: {
        position: "relative",
        width: "90vw",
        margin: "-32px 0 0 -32px",
    },
    img: {
        height: "73vh",
        width: "100%",
        objectFit: "cover",
        objectPosition: "top",
        position: "relative",
        "&::before": {
            position: "absolute",
            content: '""',
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,0.2)",
        },
    },
    wave: {
        position: "absolute",
        top: 10,
        left: 0,
        width: "270%",

        // transform: "translateX(0%)",
        animation: " $wavey linear 30s infinite",
    },
    "@keyframes wavey": {
        "0%": {
            transform: "translateX(-30%)",
        },
        "100%": {
            transform: "translateX(-70%)",
        },
    },
}));
