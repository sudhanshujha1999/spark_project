import { useTeams } from "../teams";
import { Box, Divider, Typography, Grid } from "../ui";
import { TeamsList } from "./TeamsList";
import { LeagueRecords } from "./LeagueRecords";
import { useCurrentUserInfo } from "../users";
import { useStyles } from "./Styles";
import { Member } from "./Member";

export const DashboardPage = () => {
    const classes = useStyles();
    const { userInfo } = useCurrentUserInfo();
    const { membershipTypeId = "" } = userInfo || {};
    const isCoach = membershipTypeId === "coach";
    const [teams, isLoadingTeams] = useTeams();
    const { school } = teams[0] || {};

    // Delete team is in when player click on a team then the option is available
    // const onDeleteTeam = async (teamId) => {
    //     // eslint-disable-next-line no-restricted-globals
    //     const userReallyWantsToDelete = confirm(
    //         "Are you sure you want to delete this team and all its corresponding data? (You cannot undo this)"
    //     );
    //     if (teams.length <= 1) {
    //         alert(
    //             "That's your last team! You must have at least one team. Please create another before deleting this one"
    //         );
    //         return;
    //     }

    //     if (userReallyWantsToDelete) {
    //         try {
    //             await axios.delete(`/api/teams/${teamId}`);
    //             setTeams(teams.filter((team) => team.id !== teamId));
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }
    // };

    // Edit team is now in the teams folder with name EditTeamInfo
    // const onEditTeam = async ({ name, id }) => {
    //     try {
    //         await axios.put(`/api/team/${id}/update`, { name });
    //         setTeams(
    //             teams.map((team) => {
    //                 if (team.id === id) {
    //                     return { ...team, name: name };
    //                 }
    //                 return team;
    //             })
    //         );
    //         console.log("saved");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const editTeam = (team) => {
    //     console.log(team);
    // };

    return (
        <Box style={{ position: "relative", minHeight: "83vh" }}>
            {isLoadingTeams ? (
                <p>Loading...</p>
            ) : (
                <>
                    {school && <Typography variant='h2' className={classes.orgName}>
                        {school.name}
                    </Typography>}
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
                            <TeamsList school={school} teams={teams} isCoach={isCoach} />
                        </Grid>
                    </Grid>
                </>
            )}
        </Box>
    );
};
