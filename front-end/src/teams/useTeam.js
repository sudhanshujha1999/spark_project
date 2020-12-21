import { useState, useEffect } from 'react';
import axios from 'axios';

export const useTeam = teamId => {
    const [isLoading, setIsLoading] = useState(true);
    const [team, setTeam] = useState({});

    useEffect(() => {
        const loadTeam = async () => {
            try {
                const response = await axios.get(`/api/teams/${teamId}`);
                setTeam(response.data);
            } catch (e) {
                console.log("Error!");
            }
            setIsLoading(false);
        }

        loadTeam();
    }, [teamId]);

    return { isLoading, team };
}