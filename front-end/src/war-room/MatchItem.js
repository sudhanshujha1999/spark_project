import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "../ui";
import { useStyles } from "./styles";
import banner from "../img/default-image.jpg";

export const MatchItem = ({ event, goToMatch = () => {}, organizations }) => {
    const classes = useStyles();
    const [gameDetails, setGameDetails] = useState({});

    useEffect(() => {
        if (Object.keys(organizations).length > 0) {
            const data = organizations.teams.find((team) => team.game === event.match.game);
            setGameDetails(data);
        }
    }, [organizations, event]);

    return (
        <Box className={`${classes.container}`} onClick={() => goToMatch(event.match)}>
            <Box
                className={classes.matchCardImg}
                style={{
                    backgroundImage: `linear-gradient(0deg,rgba(255, 255 ,255 , 0) 40%, black 100%),${
                        gameDetails.image_url ? `url(${gameDetails.image_url})` : `url(${banner})`
                    }`,
                }}></Box>
            <Typography className={classes.date}>{new Date(event.date).toDateString()}</Typography>
            <Box className={classes.teams}>
                <Typography className={classes.vs}>{event.match?.team.name}</Typography>
                <Typography className={classes.vs}>{event.match?.opponent_team}</Typography>
            </Box>
        </Box>
    );
};
