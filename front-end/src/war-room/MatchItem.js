import { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Typography, Tooltip } from "../ui";
import { useStyles } from "./styles";
import banner from "../img/default-image.jpg";

const MAX_LENGTH = 5;

export const MatchItem = ({ event, goToMatch = () => {}, organizations }) => {
    const classes = useStyles();
    const [gameDetails, setGameDetails] = useState({});

    useEffect(() => {
        if (Object.keys(organizations).length > 0) {
            const data = organizations.teams.find((team) => team.game === event.match.game);
            setGameDetails(data);
        }
    }, [organizations, event]);

    const nameString = useCallback((string = "") => {
        return string.length > MAX_LENGTH ? `${string.substr(0, MAX_LENGTH)}..` : string;
    }, []);

    const teamName = useMemo(() => {
        if (event.match) {
            return nameString(event.match.team.name);
        } else {
            return "";
        }
    }, [event, nameString]);

    const opponentName = useMemo(() => {
        if (event.match) {
            return nameString(event.match.opponent_team);
        } else {
            return "";
        }
    }, [event, nameString]);

    return (
        <Box className={`${classes.container}`} onClick={() => goToMatch(event.match)}>
            <Box
                className={classes.matchCardImg}
                style={{
                    backgroundImage: `${
                        gameDetails.image_url ? `url(${gameDetails.image_url})` : `url(${banner})`
                    }`,
                }}></Box>
            <Typography className={classes.date}>{new Date(event.date).toDateString()}</Typography>
            <Box className={classes.teams}>
                <Tooltip title={event.match?.team.name}>
                    <Typography className={classes.vs}>{teamName}</Typography>
                </Tooltip>
                <Tooltip title={event.match?.opponent_team}>
                    <Typography className={classes.vs}>{opponentName}</Typography>
                </Tooltip>
            </Box>
        </Box>
    );
};
