import { Link } from 'react-router-dom';
import { useTeams } from '../teams';
import {
    Box,
    Button,
    Card,
    Divider,
    Grid,
    Typography,
} from '../ui';
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
    const [teams, isLoadingTeams] = useTeams();

    const { school } = teams[0] || {};

    return (
        <Box>
            {isLoadingTeams
                ? <p>Loading...</p>
                : (
                <>
                    <Typography variant="h2">
                        {school.name || ''}
                    </Typography>
                    <Box mb={2}>
                        <Divider />
                    </Box>
                    {teams.length > 0
                        ? (
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
                                        <Link to={`/schools/${school.id}/new-team`}>
                                            <Card raised style={cardStyles}>
                                                <h3>+ Add a new team</h3>
                                            </Card>
                                        </Link>
                                    </Grid>
                                )}
                            </Grid>
                        ) : (
                            <>
                            <p>Looks like you haven't {!isCoach && 'been'} added {!isCoach && 'to'} any teams yet.</p>
                            <Grid container>
                                {isCoach && (
                                    <Grid item xs={3}>
                                        <Link to={`/schools/${school.id}/new-team`}>
                                            <Card raised style={cardStyles}>
                                                <h3>+ Add a new team</h3>
                                            </Card>
                                        </Link>
                                    </Grid>
                                )}
                            </Grid>
                            </>
                        )}
                    </>
                )}
        </Box>
    );
}