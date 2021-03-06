import { Grid, Typography, Box } from "../ui";
import { ClearAllIcon, GroupIcon, RecentActorsIcon, SportsEsportsIcon } from "../icons";
import { useStyles } from "./styles";

export const Overview = ({ teamInfo, user }) => {
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={12} sm={6} md={3} className={`${classes.gridItem} ${classes.userBio}`}>
                <Box className={`${classes.sectionHeading} ${classes.sectionBio}`}>
                    <RecentActorsIcon />
                    <Typography>Bio</Typography>
                </Box>
                <Typography>{user.bio}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={9} container>
                <Grid item xs={12} md={6} className={classes.gridItem}>
                    <Box className={classes.sectionHeading}>
                        <GroupIcon />
                        <Typography>Teams</Typography>
                    </Box>
                    <Box>
                        <Typography className={classes.textCenter}>{teamInfo.name}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} className={classes.gridItem}>
                    <Box className={classes.sectionHeading}>
                        <SportsEsportsIcon />
                        <Typography>Games</Typography>
                    </Box>
                    <Box>
                        <Typography>
                            {user.gamesAndRoles && user.gamesAndRoles.length > 0 ? (
                                teamInfo.name
                            ) : (
                                <Box className={classes.noGames}>
                                    <ClearAllIcon />
                                    <Typography>No Games Yet</Typography>
                                </Box>
                            )}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};
