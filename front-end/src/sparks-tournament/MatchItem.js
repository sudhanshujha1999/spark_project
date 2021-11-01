import { Box } from "../ui";
import { useStyles } from "./bracketStyles";

export const MatchItem = ({ won = false, isTop = false, armHeight = "100%", children }) => {
    const classes = useStyles();

    return (
        <Box
            className={`${classes.matchItem} ${isTop ? classes.topItem : classes.bottomItem} ${
                won ? classes.won : ""
            }`}
            sx={{
                "&:before": {
                    height: armHeight,
                },
            }}>
            {children}
        </Box>
    );
};
