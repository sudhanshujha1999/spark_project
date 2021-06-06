import { useState, useEffect } from "react";
import { get } from "../network";

export const useNotes = (playerId, groupId) => {
    const [isLoading, setIsLoading] = useState(true);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        console.log(playerId);
        const loadNotes = async () => {
            const response = await get(`/api/players/${playerId}/teams/${groupId}/notes`);
            const notesRaw = response.data;
            console.log(notesRaw);
            const notes = notesRaw.map((noteRaw) => ({
                ...noteRaw,
            }));
            setNotes(notes);
            setIsLoading(false);
        };

        loadNotes();
    }, [playerId]);

    return { isLoading, notes, setNotes };
};
