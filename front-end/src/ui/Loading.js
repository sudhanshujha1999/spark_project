import { Box, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    loadScreenFull: {
        display: "grid",
        placeItems: "center",
    },
}));

export const Loading = ({ height = "75vh", size = "2.5em", color = "primary" }) => {
    const classes = useStyles();
    return (
        <Box height={height} className={classes.loadScreenFull}>
            <CircularProgress size={size} color={color} />
        </Box>
    );
};
