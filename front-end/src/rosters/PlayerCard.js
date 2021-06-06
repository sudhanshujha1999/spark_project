import { Box, Typography } from "../ui";
import { useStyles } from "./styles";
import { Zoom } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export const PlayerCard = ({
    index = 1,
    teamId,
    clickable,
    rosterId,
    playerId,
    bio,
    email,
    playerName,
    gamerName,
    show = true,
}) => {
    const history = useHistory();
    const handleClick = () => {
        if (clickable) {
            history.push(`/teams/${teamId}/rosters/${rosterId}/members/${playerId}`);
        }
    };
    const classes = useStyles();
    return (
        <Zoom
            in={show}
            style={{
                transitionDelay: show ? `${(index + 2) * 50}ms` : "0ms",
            }}>
            <Box className={classes.playerCardConatiner}>
                <Box className={classes.gradient} style={{ animationDelay: `${index * 5}s` }} />
                <Box className={classes.playerCard} onClick={handleClick}>
                    <Box className={classes.teamImage} />
                    <Typography variant='h6' className={classes.playerName} gutterBottom>
                        {playerName}
                    </Typography>
                    <Box className={classes.breakWord}>
                        <Typography variant='h4' color='primary' gutterBottom>
                            {gamerName}
                        </Typography>
                    </Box>
                    <Box className={classes.breakWord}>
                        <Typography variant='subtitle2'>{bio}</Typography>
                    </Box>
                </Box>
            </Box>
        </Zoom>
    );
};
