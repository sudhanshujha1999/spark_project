import { Link, useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { fakeTeams } from '../fake-data';

export const RostersPage = () => {
    const { teamId } = useParams();
    const team = fakeTeams.find(team => team.id === teamId);
    console.log(team);

    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb">
                <Link to="/">
                    Teams
                </Link>
                <Typography color="textPrimary">{team.name}</Typography>
            </Breadcrumbs>
            <h1>{team.name}</h1>
            {team.rosters.map(roster => (
                <>
                <h3>{roster.name}</h3>
                {roster.members.map(member => (
                    <Box mb={2}>
                        <Link to={`/teams/${teamId}/rosters/${roster.id}/members/${member.id}`}>
                            <Card><Box p={2}>
                                <p>{member.name} - {member.username} - {member.role}</p>
                            </Box></Card>
                        </Link>
                    </Box>
                ))}
                <Box mb={2}>
                    <Link to={`/teams/${team.id}/rosters/${roster.id}/add`}>
                        <Card><Box p={2}>
                            <p>+ Add Member</p>
                        </Box></Card>
                    </Link>
                </Box>
                <Divider />
                </>
            ))}
        </Box>
    );
}