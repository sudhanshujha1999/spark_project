import { Box } from "../ui";
import { useBracketArmsLength } from "./useBracketArmsLength";
import { useStyles } from "./bracketStyles";
import { BracketItem } from "./BracketItem";

export const BracketContainer = ({ matches = [] }) => {
    const { containerRef: bracketContainerRef, armHeight } = useBracketArmsLength();
    const classes = useStyles();
    return (
        <Box className={classes.bracket} ref={bracketContainerRef}>
            {matches.map((match, index) => (
                <BracketItem isTop={index % 2 === 0} teams={match.teams} armHeight={armHeight} />
            ))}
        </Box>
    );
};
