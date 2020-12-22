import { Link, useParams } from 'react-router-dom';
import { useTeam } from '../teams';
import {
    Box,
    Button,
    Card,
    Divider,
} from '../ui';
import { useCurrentUserInfo } from '../users';

export const RostersPage = () => {
    const { teamId } = useParams();
    const { isLoading: isLoadingTeam, team } = useTeam(teamId);
    const { userInfo } = useCurrentUserInfo();
    const { id: currentUserId, membershipTypeId = '' } = userInfo || {};
    const isCoach = membershipTypeId === 'coach';
    const { name: teamName = '', coaches = [], rosters = [] } = team;

    return isLoadingTeam ? <p>Loading...</p> : (
        <Box>
            <h1>{teamName}</h1>
            <h1>Coaches</h1>
            {coaches.map(({ fullName: coachName }) => (
                <Box mb={2}>
                    <Card>
                        <Box p={2}>
                            <p>{coachName}</p>
                        </Box>
                    </Card>
                </Box>
            ))}
            <Divider />
            <h1>Rosters &amp; Players</h1>
            {rosters.map(({ id: rosterId, name: rosterName, players, invitations })=> (
                <>
                <h3>{rosterName}</h3>
                {players.map(({ id: playerId, fullName: playerName, gamerName })=> (
                    <Box mb={2}>
                        <Link
                            to={`/teams/${teamId}/rosters/${rosterId}/members/${playerId}`}
                            onClick={playerId === currentUserId ? () => {} : (e) => { e.preventDefault() }}
                            style={playerId === currentUserId
                                ? { cursor: 'pointer' }
                                : { cursor: 'default' }}
                        >
                            <Card style={playerId === currentUserId ? { border: '4px solid #7289da' } : {}}><Box p={2}>
                                <p>{playerName} - {gamerName}</p>
                            </Box></Card>
                        </Link>
                    </Box>
                ))}
                {invitations.map(({ email }) => (
                    <Box mb={2}>
                        <Card>
                            <Box p={2}>
                                <p>{email} - Invitation Pending</p>
                            </Box>
                        </Card>
                    </Box>
                ))}
                <Box mb={2}>
                    <Link to={`/teams/${teamId}/rosters/${rosterId}/add`}>
                        {isCoach && (
                            <Button
                                color="primary"
                                variant="contained"
                            >+ Add Member</Button>
                        )}
                    </Link>
                </Box>
                <Divider />
                </>
            ))}
        </Box>
    );
}