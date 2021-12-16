import { Box } from "../ui";
import { MatchItem } from "./MatchItem";
import { useBracketArmsLength } from "./useBracketArmsLength";
import { useStyles } from "./bracketStyles";

export const MatchContainer = ({ teams = [] }) => {
    const { containerRef: matchContainerRef, armHeight } = useBracketArmsLength();
    const classes = useStyles();
    return (
        <Box className={classes.matchContainer} ref={matchContainerRef}>
            {teams.map((team, index) => (
                <MatchItem isTop={index % 2 === 0} armHeight={armHeight} won={team.won}>
                    {team.name}
                </MatchItem>
            ))}
        </Box>
    );
};
