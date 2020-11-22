import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { fakeTeams } from '../fake-data';

const cardStyles = {
    alignItems: 'center',
    display: 'flex',
    fontSize: '16px',
    height: '200px',
    justifyContent: 'center',
};

export const DashboardPage = () => {
    const teams = fakeTeams;

    return (
        <Box>
            <h1>Smith High School Esports</h1>
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
                <Grid item xs={3}>
                    <Card raised style={cardStyles}>
                        <h3>+ Add a new team</h3>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}