import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    // Event Details form
    eventDetailsForm: {
        position: "relative",
        padding: 20,
        overflow: "hidden",
        zIndex: 1,
        width: "max(300px, 40vw)",
    },
    gradient: {
        position: "absolute",
        zIndex: "-1",
        right: 0,
        width: "100%",
        height: "450px",
        top: "-50%",
        boxShadow: "2px -3px 10px rgb(30, 30, 30, 0.3)",
        top: "-50%",
        tranistion: "0.2s all ease-out",
        transformOrigin: "right bottom",
        animation: "$animateName 1s forwards",
    },
    "@keyframes animateName": {
        "0%": {
            width: "150%",
            height: "150%",
            zIndex: 2,
        },
        "40%": {
            width: "150%",
            height: "150%",
            transform: "rotateZ(35deg)",
            zIndex: 2,
        },
        "80%": {
            width: "100%",
            height: "100%",
            transform: "rotateZ(35deg) ",
            zIndex: 4,
        },
        "100%": {
            // width: "100%",
            // height: "100%",
            transform: "rotateZ(35deg) ",
            boxShadow: "2px -3px 10px rgb(30, 30, 30, 0.3)",
            zIndex: "-1",
        },
    },
    deleteButton: {
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 1,
        opacity: 0,
        transform: "scale(0) translate(-15px, 15px)",
        tranistiom: "0.2s all ease-out",
        animation: "$button 0.3s ease-out forwards",
        animationDelay: "1s",
    },
    "@keyframes button": {
        "0%": {
            transform: "scale(0) translate(-15px, 15px)",
        },
        "100%": {
            opacity: 1,
            transform: "scale(1) translate(-15px, 15px)",
        },
    },
}));
