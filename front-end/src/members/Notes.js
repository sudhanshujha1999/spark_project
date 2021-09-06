import { useStyles } from "./styles";
import { useState } from "react";
import { SpeakerNotesIcon, ClearAllIcon } from "../icons";
import {
    Box,
    Button,
    CircularProgress,
    DeletableListItem,
    Divider,
    TextField,
    Typography,
} from "../ui";

export const Notes = ({ notes, addNote, deleteNote, viewingOwnProfile }) => {
    const [newNoteText, setNewNoteText] = useState("");
    const [saving, setSaving] = useState(false);
    const classes = useStyles();

    const handleAdd = async () => {
        setSaving(true);
        try {
            await addNote(newNoteText);
            setNewNoteText("");
        } catch (error) {
            console.log(error);
        }
        setSaving(false);
    };

    return (
        <div>
            <Box width='fit-content' className={`${classes.sectionHeading}`}>
                <SpeakerNotesIcon />
                <Typography>Notes</Typography>
            </Box>
            {notes.length > 0 ? (
                notes.map((note) => (
                    <Box key={note.id} className={classes.note}>
                        <DeletableListItem onRequestDelete={() => deleteNote(note.id)}>
                            {/* <h3>{new Date(note.createdAt).toDateString()}</h3> */}
                            <p>{note.text}</p>
                        </DeletableListItem>
                    </Box>
                ))
            ) : (
                <Box
                    my={4}
                    className={classes.noGames}
                    style={{
                        justifyContent: "flex-start",
                    }}>
                    <ClearAllIcon />
                    <Typography>No Notes</Typography>
                </Box>
            )}
            {!viewingOwnProfile && (
                <>
                    <Box>
                        <TextField
                            value={newNoteText}
                            onChange={(e) => setNewNoteText(e.target.value)}
                            label='New Note'
                            fullWidth
                            variant='outlined'
                        />
                    </Box>
                    <Box mt={2}>
                        <Button
                            onClick={handleAdd}
                            color='primary'
                            disabled={saving}
                            fullWidth
                            variant='contained'>
                            {saving ? <CircularProgress color='secondary' /> : "Add Note"}
                        </Button>
                    </Box>
                </>
            )}
            <Divider />
        </div>
    );
};
