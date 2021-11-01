import { Box } from "../ui";
// import { MatchContainer } from "./MatchContainer";
import { BracketContainer } from "./BracketContainer";
import { useRef } from "react";

//this will be variable

export const SparksTournamentPage = () => {
    const conRref = useRef(null);
    return (
        <Box p={2} ref={conRref}>
            <Box display='flex'>
                <Box>
                    <BracketContainer matches={allMatchesOnDay} />
                </Box>
            </Box>
        </Box>
    );
};

const allMatchesOnDay = [
    {
        teams: [
            {
                name: "team1",
                won: false,
            },
            {
                name: "team2",
                won: true,
            },
        ],
    },
    {
        teams: [
            {
                name: "ram bharose",
                won: true,
            },
            {
                name: "xttt",
                won: false,
            },
        ],
    },
];
