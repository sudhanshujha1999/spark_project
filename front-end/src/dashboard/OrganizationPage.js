import { Box, Grid, Typography, Divider } from "../ui";
import { TeamsList } from "./TeamsList";
import { LeagueRecords } from "./LeagueRecords";
import { useStyles } from "./Styles";
import { Member } from "./Member";

export const OrganizationPage = ({ isCoach, teams, oraganiszation }) => {
    const classes = useStyles();
    return (
        <Box>
            <Typography variant='h2' className={classes.orgName}>
                {oraganiszation && (oraganiszation.name || "")}
            </Typography>
            <Box mt={2} mb={7}>
                <Divider />
            </Box>
            <Grid container>
                <Grid item xs={12} sm={5} container>
                    <Grid item xs={12}>
                        <LeagueRecords teams={teams} />
                    </Grid>
                    <Grid item xs={12}>
                        <Member teams={teams} />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <TeamsList school={oraganiszation} teams={teams} isCoach={isCoach} />
                </Grid>
            </Grid>
        </Box>
    );
};
