import { useState, useEffect } from 'react';
import { get } from '../network';

export const useNotes = (playerId) => {
    const [isLoading, setIsLoading] = useState(true);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const loadNotes = async () => {
            const response = await get(`/api/players/${playerId}/notes`);
            const notesRaw = response.data;
            const notes = notesRaw.map(noteRaw => ({
                ...noteRaw,
            }));
            setNotes(notes);
            setIsLoading(false);
        }
        
        loadNotes();
    }, [playerId]);

    return { isLoading, notes, setNotes };
}