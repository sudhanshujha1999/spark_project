import { useState, useEffect } from 'react';
import { get } from '../network';

export const useTeam = teamId => {
    const [isLoading, setIsLoading] = useState(true);
    const [team, setTeam] = useState({});

    useEffect(() => {
        const loadTeam = async () => {
            try {
                const response = await get(`/api/teams/${teamId}`);
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