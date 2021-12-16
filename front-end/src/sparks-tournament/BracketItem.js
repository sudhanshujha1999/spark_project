import { Box } from "../ui";
import { useStyles } from "./bracketStyles";
import { MatchContainer } from "./MatchContainer";

export const BracketItem = ({ teams, isTop, armHeight }) => {
    const classes = useStyles();
    return (
        <Box
            className={`${classes.bracketItem} ${
                isTop ? classes.topItemBracket : classes.bottomItemBracket
            }`}
            sx={{
                "&:before": {
                    height: armHeight,
                },
            }}>
            <MatchContainer teams={teams} />
        </Box>
    );
};
