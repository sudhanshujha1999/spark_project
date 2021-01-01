import { useState, useEffect } from 'react';
import { get } from '../network';

export const useTeamPlayers = teamId => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const loadPlayers = async () => {
            try {
                const response = await get(`/api/teams/${teamId}/players`);
                setPlayers(response.data);
            } catch (e) {
                console.log("Error!");
            }
        }

        loadPlayers();
    }, [teamId]);

    return players;
}