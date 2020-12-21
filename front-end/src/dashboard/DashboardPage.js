import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { useTeams } from '../teams';
import { useCurrentUserInfo } from '../users';

const cardStyles = {
    alignItems: 'center',
    display: 'flex',
    fontSize: '16px',
    height: '200px',
    justifyContent: 'center',
};

export const DashboardPage = () => {
    const { userInfo } = useCurrentUserInfo();
    const { membershipTypeId = '' } = userInfo || {}
    const isCoach = membershipTypeId === 'coach';
    const [teams, isLoadingTeams, teamsError] = useTeams();

    const { school } = teams[0] || {};

    return (
        <Box>
            {isLoadingTeams
                ? <p>Loading...</p>
                : teams.length > 0
                    ? (
                        <>
                        <h1>{school.name || ''}</h1>
                        <Grid container spacing={2}>
                            {teams.map(team => (
                                <Grid item xs={3} key={team.id}>
                                    <Link to={`/teams/${team.id}`}>
                                        <Card raised style={cardStyles}>
                                            <h3 key={team.id}>{team.name}</h3>
                                        </Card>
                                    </Link>
                                </Grid>
                            ))}
                            {isCoach && (
                                <Grid item xs={3}>
                                    <Card raised style={cardStyles}>
                                        <h3>+ Add a new team</h3>
                                    </Card>
                                </Grid>
                            )}
                        </Grid>
                        </>
                    ) : (
                        <p>Looks like you haven't been added to any teams yet.</p>
                    )}
        </Box>
    );
}