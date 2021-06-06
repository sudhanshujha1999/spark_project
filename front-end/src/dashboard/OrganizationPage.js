import { Box, Grid, Typography, Divider } from "../ui";
import { TeamsList } from "./TeamsList";
import { LeagueRecords } from "./LeagueRecords";
import { useStyles } from "./Styles";
import { Member } from "./Member";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useIsCoach } from "../users/useIsCoach";

export const OrganizationPage = ({ user, teams, organization }) => {
    const classes = useStyles();
    const history = useHistory();
    // check if the organization has any teams and the user is the creator then redirect to create teams page
    // otherwise we can show you are not in any team please contact your coach
    const { isCoach } = useIsCoach(organization._id);
    return (
        <Box>
            <Typography variant='h2' className={classes.orgName}>
                {organization && (organization.name || "")}
            </Typography>
            <Box mt={2} mb={7}>
                <Divider />
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={5} container>
                    <Grid item xs={12}>
                        <LeagueRecords teams={teams} />
                    </Grid>
                    <Grid item xs={12}>
                        <Member teams={teams} />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <TeamsList school={organization} teams={teams} isCoach={isCoach} />
                </Grid>
            </Grid>
        </Box>
    );
};
