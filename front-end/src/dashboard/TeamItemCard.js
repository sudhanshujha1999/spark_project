import { Box, Grid, Typography, Button, IconButton } from "../ui";
import { SettingsIcon } from "../icons";
import { useHistory, Link } from "react-router-dom";
import { useStyles } from "./Styles";
import banner from "../img/default-image.jpg";

export const TeamItemCard = ({ team, isCoach, index }) => {
    const classes = useStyles();
    const history = useHistory();
    const handleClick = () => {
        history.push(`/teams/${team._id}`);
    };
    const editTeam = () => {
        history.push(`/teams/${team._id}/edit`);
    };
    return (
        <Grid item xs={12} sm={6} lg={4} key={team.id}>
            <Box className={classes.teamCard} onClick={handleClick}>
                <Box className={classes.rank}>{index}</Box>
                <Box className={classes.background} />
                <Box className={classes.front}>
                    <Box
                        className={classes.teamImg}
                        style={{
                            backgroundImage: team.image_url
                                ? `url(${team.image_url})`
                                : `url(${banner})`,
                        }}
                    />
                    <Typography className={classes.teamName}>
                        {team.name}
                        {isCoach && (
                            <Link to={`/teams/${team.id}/edit`}>
                                <IconButton
                                    className={classes.iconBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        editTeam();
                                    }}>
                                    <SettingsIcon size='small' className={classes.btnIcon} />
                                </IconButton>
                            </Link>
                        )}
                    </Typography>
                </Box>
                <Box className={classes.back}>
                    <Typography gutterBottom className={classes.gameName}>
                        {team.game}
                    </Typography>
                    <Button
                        variant='contained'
                        className={classes.teamCardBtn}
                        disableElevation
                        color='primary'
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClick();
                            console.log("btn");
                        }}>
                        See Team
                    </Button>
                </Box>
            </Box>
        </Grid>
    );
};
