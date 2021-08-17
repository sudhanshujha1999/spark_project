import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
    // global signup page style
    bgImage: {
        backgroundColor: "#333",
        height: "90vh",
    },
    // sign in page discord btn
    discordBtn: {
        color: "#fff",
        backgroundImage: "none",
        backgroundColor: "#5865F2",
        "&:hover": {
            backgroundColor: "#313882",
        },
    },
    // loading style
    loading: {
        display: "grid",
        placeItems: "center",
        minHeight: "75vh",
    },
}));
