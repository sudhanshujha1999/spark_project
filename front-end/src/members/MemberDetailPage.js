import { useParams } from 'react-router-dom';
import { AccountCircleIcon } from '../icons';
import { useUser } from '../users';
import {
    Box,
    Container,
    Grid,
    Typography,
} from '../ui';

export const MemberDetailPage = () => {
    const { memberId } = useParams();
    console.log(memberId);
    const { isLoading, user } = useUser(memberId);

    return isLoading ? <p>Loading...</p> : (
        <Container maxWidth="sm">
            {/* <Breadcrumbs aria-label="breadcrumb">
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
            </Breadcrumbs> */}
            <Box align="center" width="100%">
                <AccountCircleIcon style={{ fontSize: 200 }} />
            </Box>
            <Typography variant="h2" align="center">
                {user.fullName}
            </Typography>
            <Grid container>
                <Grid item xs={6}>
                    <h3>Gamer Name: {user.gamerName}</h3>
                    <h3>Bio:</h3>
                    <p>{user.bio}</p>
                </Grid>
                <Grid item xs={6}>
                    <h3>Other Stuff</h3>
                </Grid>
            </Grid>
        </Container>
    );
}