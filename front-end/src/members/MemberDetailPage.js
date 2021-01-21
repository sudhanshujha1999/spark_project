import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AccountCircleIcon } from '../icons';
import { post, del } from '../network';
import { useNotes } from '../notes';
import { useUser } from '../users';
import {
    Box,
    Button,
    DeletableListItem,
    Divider,
    Grid,
    TextField,
    Typography,
} from '../ui';

export const MemberDetailPage = () => {
    const [newNoteText, setNewNoteText] = useState('');
    const { memberId } = useParams();
    const { isLoading, user } = useUser(memberId);
    const { isLoading: isLoadingNotes, notes, setNotes } = useNotes(memberId);

    const addNote = async () => {
        try {
            const response = await post(`/api/players/${memberId}/notes`, { text: newNoteText });
            const newNote = response.data;
            setNotes([newNote, ...notes]);
            setNewNoteText('');
        } catch (e) {
            console.log(e);
        }
    }

    const deleteNote = async (noteId) => {
        try {
            await del(`/api/players/${memberId}/notes/${noteId}`);
            setNotes(notes.filter(note => note.id !== noteId));
        } catch (e) {
            console.log(e);
        }
    }

    return isLoading ? <p>Loading...</p> : (
        <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
                <Box width="100%">
                    <AccountCircleIcon style={{ fontSize: 200 }} />
                </Box>
                <Typography variant="h2">
                    {user.fullName}
                </Typography>
                <h3>Gamer Name: {user.gamerName}</h3>
                <h3>Bio:</h3>
                <p>{user.bio}</p>
            </Grid>
            <Grid item md={6} xs={12}>
                <h3>Notes</h3>
                <Box>
                    <TextField
                        value={newNoteText}
                        onChange={e => setNewNoteText(e.target.value)}
                        label="New Note"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                    />
                </Box>
                <Box mt={2}>
                    <Button
                        onClick={addNote}
                        color="primary"
                        fullWidth
                        variant="contained"
                    >Add Note</Button>
                </Box>
                <Divider />
                {notes.map(note => (
                    <Box key={note.id}>
                        <DeletableListItem onRequestDelete={() => deleteNote(note.id)}>
                            {/* <h3>{new Date(note.createdAt).toDateString()}</h3> */}
                            <p>{note.text}</p>
                        </DeletableListItem>
                        <Divider />
                    </Box>
                ))}
            </Grid>
        </Grid>
    );
}