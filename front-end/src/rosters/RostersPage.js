import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { post } from '../network';
import { useTeam } from '../teams';
import {
    Box,
    Button,
    Card,
    Divider,
    TextField,
    Typography,
} from '../ui';
import { useCurrentUserInfo } from '../users';
import { isEmail } from '../util';

export const RostersPage = () => {
    const { teamId } = useParams();
    const { isLoading: isLoadingTeam, team } = useTeam(teamId);
    const { userInfo } = useCurrentUserInfo();
    const { id: currentUserId, membershipTypeId = '' } = userInfo || {};
    const isCoach = membershipTypeId === 'coach';
    const { name: teamName = '', coaches = [], rosters = [] } = team;
    const [newPlayerEmail, setNewPlayerEmail] = useState('');
    const [addingPlayerToIndex, setAddingPlayerToIndex] = useState(-1);
    const [newPlayerEmailError, setNewPlayerEmailError] = useState('');
    const [newPlayerEmails, setNewPlayerEmails] = useState({});

    const onAddPlayer = async rosterId => {
        if (!isEmail(newPlayerEmail)) return setNewPlayerEmailError('Not a valid email');

        try {
            await post(
                `/api/rosters/${rosterId}/players`,
                { email: newPlayerEmail },
            );

            setNewPlayerEmails({
                ...newPlayerEmails,
                [rosterId]: [...(newPlayerEmails[rosterId] || []), newPlayerEmail],
            });
            setNewPlayerEmail('');
            setAddingPlayerToIndex(-1);
            setNewPlayerEmailError('');
        } catch (e) {
            console.log(e);
            setNewPlayerEmailError('Something went wrong with the server...');
        }
    }

    const onCancelAddingPlayer = () => setAddingPlayerToIndex(-1);

    return isLoadingTeam ? <p>Loading...</p> : (
        <Box>
            <Typography variant="h2">
                {teamName}
            </Typography>
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
            {rosters.map(({ id: rosterId, name: rosterName, players, invitations }, rosterIndex)=> {
                const newPlayerEmailsForRoster = newPlayerEmails[rosterId] || [];

                return (
                    <>
                    <h3>{rosterName}</h3>
                    {players.map(({ id: playerId, fullName: playerName, gamerName })=> (
                        <Box mb={2}>
                            <Link
                                to={`/teams/${teamId}/rosters/${rosterId}/members/${playerId}`}
                                onClick={isCoach || playerId === currentUserId ? () => {} : (e) => { e.preventDefault() }}
                                style={isCoach || playerId === currentUserId
                                    ? { cursor: 'pointer' }
                                    : { cursor: 'default' }}
                            >
                                <Card style={playerId === currentUserId ? { border: '4px solid #7289da' } : {}}>
                                    <Box p={2}>
                                        <p>{playerName} - {gamerName}</p>
                                    </Box>
                                </Card>
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
                    {newPlayerEmailsForRoster.map(email => (
                        <Box mb={2}>
                            <Card>
                                <Box p={2}>
                                    <p>{email} - Invitation Pending</p>
                                </Box>
                            </Card>
                        </Box>
                    ))}
                    {isCoach && <form onSubmit={e => {
                        onAddPlayer(rosterId);
                        e.preventDefault();
                    }}>
                        <Box mb={2} style={{ display: 'flex' }}>
                            {addingPlayerToIndex === rosterIndex
                                ? (
                                    <>
                                    <TextField
                                        error={!!newPlayerEmailError}
                                        helperText={newPlayerEmailError}
                                        value={newPlayerEmail}
                                        onChange={e => setNewPlayerEmail(e.target.value)}
                                        style={{ flex: 8, marginRight: 8 }}
                                        label="Email Address"
                                        fullWidth
                                        inputRef={input => input && input.focus()}
                                        variant="outlined" />
                                    <Button
                                        onClick={onCancelAddingPlayer}
                                        style={{ flex: 1, marginRight: 8 }}
                                        color="primary"
                                        variant="contained"
                                    >Cancel</Button>
                                    <Button
                                        style={{ flex: 1 }}
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                    >Add</Button>
                                    </>
                                ) : (
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={() => setAddingPlayerToIndex(rosterIndex)}
                                    >+ Add Member</Button>
                                )}
                        </Box>
                    </form>}
                    <Divider />
                    </>
                )})}
        </Box>
    );
}