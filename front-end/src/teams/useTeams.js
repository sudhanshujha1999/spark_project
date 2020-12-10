import { useState, useEffect } from 'react';
import axios from 'axios';

export const useTeams = (userId, position) => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const loadPlayers = async () => {
            try {
                const response = await axios.get(`/api/users/${userId}/teams?position=${position}`);
                setTeams(response.data);
            } catch (e) {
                console.log("Error!");
            }
        }

        loadPlayers();
    }, [userId, position]);

    return teams;
}