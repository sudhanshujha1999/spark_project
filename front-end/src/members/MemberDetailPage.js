import { Link, useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { fakeTeams } from '../fake-data';

export const MemberDetailPage = () => {
    const { teamId, rosterId, memberId } = useParams();
    const team = fakeTeams.find(team => team.id === teamId);
    const roster = team.rosters.find(roster => roster.id === rosterId);
    const member = roster.members.find(member => member.id === memberId);

    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb">
                <Link to="/">
                    Teams
                </Link>
                <Link to={`/teams/${team.id}`}>
                    {team.name}
                </Link>
                <Link to={`/teams/${team.id}`}>
                    {roster.name}
                </Link>
                <Typography color="textPrimary">{member.name}</Typography>
            </Breadcrumbs>
            <h1>{member.name}</h1>
            <h3>{member.username}</h3>
            <p>{member.role}</p>
        </Box>
    );
}