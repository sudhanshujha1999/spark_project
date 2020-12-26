import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import axios from 'axios';
import { useCurrentUser } from '../auth'

export const useNotes = (playerId) => {
    const [isLoading, setIsLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    const { user } = useCurrentUser();

    useEffect(() => {
        const loadNotes = async () => {
            const authtoken = await user.getIdToken();
            const response = await axios.get(`/api/players/${playerId}/notes`, { headers: { authtoken }});
            const notesRaw = response.data;
            const notes = notesRaw.map(noteRaw => ({
                ...noteRaw,
            }))
            setNotes(notes);
            setIsLoading(false);
        }
        
        if (user) {
            loadNotes();
        }
    }, [playerId, user]);

    return { isLoading, notes, setNotes };
}